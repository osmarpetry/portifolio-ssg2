const fs = require("node:fs/promises");
const http = require("node:http");
const https = require("node:https");
const path = require("node:path");

const CACHE_FILE_PATH = path.resolve(__dirname, "../src/data/slides-cache.json");
const THUMBNAIL_DIR_PATH = path.resolve(__dirname, "../static/assets/images/slides");
const THUMBNAIL_PUBLIC_DIR = "/assets/images/slides";
const DEFAULT_PROFILE_URL = "https://www.slideshare.net/OsmarPetry";
const REQUEST_TIMEOUT_MS = Number(process.env.SLIDES_SYNC_TIMEOUT_MS || 8000);

const parseJson = (text, label) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${error.message}`);
  }
};

const asTrimmedString = (value, fieldName, { allowEmpty = false } = {}) => {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be string`);
  }

  const trimmed = value.trim();

  if (!allowEmpty && !trimmed) {
    throw new Error(`${fieldName} must not be empty`);
  }

  return trimmed;
};

const asNumber = (value, fieldName) => {
  if (value === "" || value === null || value === undefined) {
    return 0;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${fieldName} must be non-negative number`);
  }

  return parsed;
};

const normalizeTopics = (value, index) => {
  if (!Array.isArray(value)) {
    throw new Error(`slides[${index}].topics must be array`);
  }

  return value
    .map((topic) => {
      if (typeof topic !== "string") {
        throw new Error(`slides[${index}].topics must contain strings`);
      }

      return topic.trim();
    })
    .filter(Boolean);
};

const normalizeSlide = (slide, index) => {
  if (!slide || typeof slide !== "object" || Array.isArray(slide)) {
    throw new Error(`slides[${index}] must be object`);
  }

  const thumbnailValue =
    slide.thumbnail ?? slide.image ?? slide.imageUrl ?? slide.thumbnailUrl ?? "";

  return {
    slug: asTrimmedString(slide.slug, `slides[${index}].slug`),
    title: asTrimmedString(slide.title, `slides[${index}].title`),
    description:
      slide.description === undefined || slide.description === null
        ? ""
        : asTrimmedString(slide.description, `slides[${index}].description`, {
            allowEmpty: true,
          }),
    url: asTrimmedString(slide.url, `slides[${index}].url`),
    views: asNumber(slide.views, `slides[${index}].views`),
    slideCount: asNumber(slide.slideCount, `slides[${index}].slideCount`),
    thumbnail:
      thumbnailValue === undefined || thumbnailValue === null
        ? ""
        : asTrimmedString(thumbnailValue, `slides[${index}].thumbnail`, {
            allowEmpty: true,
          }),
    publishedDate:
      slide.publishedDate === undefined || slide.publishedDate === null
        ? ""
        : asTrimmedString(slide.publishedDate, `slides[${index}].publishedDate`, {
            allowEmpty: true,
          }),
    topics: normalizeTopics(slide.topics || [], index),
  };
};

const sortSlides = (slides) =>
  [...slides].sort((left, right) => {
    if (right.views !== left.views) {
      return right.views - left.views;
    }

    if (right.publishedDate !== left.publishedDate) {
      return right.publishedDate.localeCompare(left.publishedDate);
    }

    return left.title.localeCompare(right.title);
  });

const ensureUniqueSlugs = (slides) => {
  const seen = new Set();

  for (const slide of slides) {
    if (seen.has(slide.slug)) {
      throw new Error(`duplicate slide slug: ${slide.slug}`);
    }

    seen.add(slide.slug);
  }
};

const buildCacheDocument = (payload) => {
  const slidesSource = Array.isArray(payload) ? payload : payload?.slides;

  if (!Array.isArray(slidesSource)) {
    throw new Error("remote payload must be array or object with slides array");
  }

  const slides = slidesSource.map(normalizeSlide);
  ensureUniqueSlugs(slides);

  return {
    profileUrl:
      typeof payload?.profileUrl === "string" && payload.profileUrl.trim()
        ? payload.profileUrl.trim()
        : DEFAULT_PROFILE_URL,
    slides: sortSlides(slides),
  };
};

const mergeWithExistingSlides = (document, existingDocument) => {
  const existingBySlug = new Map(
    (existingDocument.slides || []).map((slide) => [slide.slug, slide])
  );

  return {
    profileUrl: document.profileUrl || existingDocument.profileUrl || DEFAULT_PROFILE_URL,
    slides: document.slides.map((slide) => {
      const existingSlide = existingBySlug.get(slide.slug);

      if (!existingSlide) {
        return slide;
      }

      return {
        ...slide,
        description: slide.description || existingSlide.description || "",
        thumbnail: slide.thumbnail || existingSlide.thumbnail || "",
        topics: slide.topics.length ? slide.topics : existingSlide.topics || [],
      };
    }),
  };
};

const readCacheText = async () => {
  try {
    return await fs.readFile(CACHE_FILE_PATH, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return "";
    }

    throw error;
  }
};

const requestBuffer = (url, { headers = {}, redirectCount = 0 } = {}) =>
  new Promise((resolve, reject) => {
    const targetUrl = new URL(url);
    const client = targetUrl.protocol === "https:" ? https : http;

    const request = client.request(
      targetUrl,
      {
        method: "GET",
        headers,
      },
      (response) => {
        const statusCode = response.statusCode || 0;
        const location = response.headers.location;

        if (
          location &&
          [301, 302, 303, 307, 308].includes(statusCode)
        ) {
          response.resume();

          if (redirectCount >= 5) {
            reject(new Error("too many redirects"));
            return;
          }

          resolve(
            requestBuffer(new URL(location, targetUrl).toString(), {
              headers,
              redirectCount: redirectCount + 1,
            })
          );
          return;
        }

        const chunks = [];

        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () =>
          resolve({
            statusCode,
            statusMessage: response.statusMessage || "",
            headers: response.headers,
            body: Buffer.concat(chunks),
          })
        );
      }
    );

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error(`request timed out after ${REQUEST_TIMEOUT_MS}ms`));
    });

    request.on("error", reject);
    request.end();
  });

const fetchRemotePayload = async (sourceUrl) => {
  const response = await requestBuffer(sourceUrl, {
    headers: {
      accept: "application/json, text/plain;q=0.9, */*;q=0.1",
      "user-agent": "portifolio-ssg2-slides-sync/1.0",
    },
  });

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(
      `remote fetch failed with ${response.statusCode} ${response.statusMessage}`
    );
  }

  return parseJson(response.body.toString("utf8"), "remote payload");
};

const extensionFromContentType = (contentType) => {
  const normalizedContentType = Array.isArray(contentType)
    ? contentType[0]
    : contentType;

  if (!normalizedContentType) {
    return ".jpg";
  }

  if (normalizedContentType.includes("png")) {
    return ".png";
  }

  if (normalizedContentType.includes("webp")) {
    return ".webp";
  }

  if (normalizedContentType.includes("avif")) {
    return ".avif";
  }

  return ".jpg";
};

const downloadThumbnail = async (slug, thumbnailUrl, { force } = {}) => {
  const filePathWithoutExtension = path.resolve(THUMBNAIL_DIR_PATH, slug);

  if (!force) {
    for (const extension of [".jpg", ".png", ".webp", ".avif"]) {
      try {
        await fs.access(`${filePathWithoutExtension}${extension}`);
        return `${THUMBNAIL_PUBLIC_DIR}/${slug}${extension}`;
      } catch {}
    }
  }

  const response = await requestBuffer(thumbnailUrl, {
    headers: {
      accept: "image/*,*/*;q=0.8",
      "user-agent": "portifolio-ssg2-slides-sync/1.0",
    },
  });

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(
      `thumbnail download failed with ${response.statusCode} ${response.statusMessage}`
    );
  }

  const extension = extensionFromContentType(response.headers["content-type"]);
  const publicPath = `${THUMBNAIL_PUBLIC_DIR}/${slug}${extension}`;
  const filePath = path.resolve(__dirname, `../static${publicPath}`);

  await fs.mkdir(THUMBNAIL_DIR_PATH, { recursive: true });
  await fs.writeFile(filePath, response.body);
  return publicPath;
};

const localizeThumbnails = async (document, { force } = {}) => {
  let downloadedCount = 0;

  const slides = await Promise.all(
    document.slides.map(async (slide) => {
      if (!/^https?:\/\//i.test(slide.thumbnail)) {
        return slide;
      }

      try {
        const localThumbnail = await downloadThumbnail(slide.slug, slide.thumbnail, {
          force,
        });
        downloadedCount += 1;

        return {
          ...slide,
          thumbnail: localThumbnail,
        };
      } catch (error) {
        console.warn(
          `[slides-sync] Thumbnail download failed for ${slide.slug}. Keeping current value. ${error.message}`
        );
        return slide;
      }
    })
  );

  if (downloadedCount > 0) {
    console.log(`[slides-sync] Downloaded ${downloadedCount} slide thumbnail(s).`);
  }

  return {
    ...document,
    slides,
  };
};

const writeCacheIfChanged = async (document) => {
  const nextText = `${JSON.stringify(document, null, 2)}\n`;
  const currentText = await readCacheText();

  if (currentText === nextText) {
    console.log("[slides-sync] Cache already up to date.");
    return;
  }

  await fs.writeFile(CACHE_FILE_PATH, nextText, "utf8");
  console.log(`[slides-sync] Cache updated at ${CACHE_FILE_PATH}.`);
};

const main = async () => {
  const sourceUrl = process.env.SLIDES_SYNC_SOURCE_URL?.trim();
  const currentText = await readCacheText();
  const currentDocument = currentText
    ? buildCacheDocument(parseJson(currentText, "current cache"))
    : {
        profileUrl: DEFAULT_PROFILE_URL,
        slides: [],
      };

  let nextDocument = currentDocument;

  if (!sourceUrl) {
    console.log("[slides-sync] No SLIDES_SYNC_SOURCE_URL. Using git-tracked cache.");
  } else {
    console.log(`[slides-sync] Fetching slides from ${sourceUrl}.`);

    try {
      const payload = await fetchRemotePayload(sourceUrl);
      const remoteDocument = buildCacheDocument(payload);
      nextDocument = mergeWithExistingSlides(remoteDocument, currentDocument);
    } catch (error) {
      console.warn(`[slides-sync] Remote sync failed. Keeping cache. ${error.message}`);
    }
  }

  nextDocument = await localizeThumbnails(nextDocument, { force: Boolean(sourceUrl) });
  await writeCacheIfChanged(nextDocument);
};

main().catch((error) => {
  console.error(`[slides-sync] Fatal error. ${error.message}`);
  process.exitCode = 1;
});
