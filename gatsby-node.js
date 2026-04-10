const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const siteConfig = require("./site-config");
const pageMetadata = require("./src/data/page-metadata");

const escapeXml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const wrapText = (text, maxCharsPerLine, maxLines) => {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return [];
  }

  const lines = [];
  let currentLine = words.shift();

  words.forEach((word) => {
    const nextLine = `${currentLine} ${word}`;

    if (nextLine.length <= maxCharsPerLine) {
      currentLine = nextLine;
      return;
    }

    lines.push(currentLine);
    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  const limitedLines = lines.slice(0, maxLines);

  if (lines.length > maxLines) {
    const lastLine = limitedLines[maxLines - 1] || "";
    limitedLines[maxLines - 1] = `${lastLine.replace(/[.,;:!?]$/, "")}\u2026`;
  }

  return limitedLines;
};

const buildTspans = (lines, x, lineHeight) =>
  lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : lineHeight;
      return `<tspan x="${x}" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");

const createOgOverlay = ({ eyebrow, title, description }) => {
  const titleLines = wrapText(title, 28, 3);
  const descriptionLines = wrapText(description, 48, 3);

  return `
    <svg width="${siteConfig.socialImageWidth}" height="${siteConfig.socialImageHeight}" viewBox="0 0 ${siteConfig.socialImageWidth} ${siteConfig.socialImageHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="og-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0C1310" stop-opacity="0.08" />
          <stop offset="48%" stop-color="#0C1310" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#0C1310" stop-opacity="0.92" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#og-gradient)" />
      <rect x="56" y="52" rx="999" ry="999" width="188" height="42" fill="#FFFFFF" fill-opacity="0.14" />
      <text x="80" y="80" fill="#F7F3ED" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="2">${escapeXml(
        eyebrow
      ).toUpperCase()}</text>
      <text x="60" y="382" fill="#FFFFFF" font-family="Georgia, Times New Roman, serif" font-size="60" font-weight="700">${buildTspans(
        titleLines,
        60,
        68
      )}</text>
      <text x="64" y="530" fill="#FFFFFF" fill-opacity="0.86" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="500">${buildTspans(
        descriptionLines,
        64,
        38
      )}</text>
    </svg>
  `;
};

const generateOgImage = async ({ outputPath, title, description, eyebrow }) => {
  const heroImagePath = path.resolve(__dirname, siteConfig.heroImageSourcePath);
  const overlay = Buffer.from(
    createOgOverlay({
      eyebrow,
      title,
      description,
    })
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  await sharp(heroImagePath)
    .resize(siteConfig.socialImageWidth, siteConfig.socialImageHeight, {
      fit: "cover",
      position: "centre",
    })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(outputPath);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("src/templates/post.jsx");

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          frontmatter {
            title
            date
            tags
            description
            layout
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.nodes.filter(
    (node) => node.fields.slug !== "resume"
  );

  posts.forEach((post) => {
    createPage({
      path: `/posts/${post.fields.slug}/`,
      component: postTemplate,
      context: {
        id: post.id,
        slug: post.fields.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const slug = fileNode.name;

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { slug: { ne: "resume" } } }) {
        nodes {
          excerpt(pruneLength: 180)
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Failed to query posts for Open Graph images.", result.errors);
    return;
  }

  const outputDir = path.resolve(__dirname, "public", "assets", "images", "og");
  const staticPages = [
    {
      ...pageMetadata.home,
      eyebrow: "Portfolio",
    },
    {
      ...pageMetadata.projects,
      eyebrow: "Projects",
    },
    {
      ...pageMetadata.posts,
      eyebrow: "Writing",
    },
    {
      ...pageMetadata.resume,
      eyebrow: "Resume",
    },
  ];

  for (const page of staticPages) {
    await generateOgImage({
      outputPath: path.join(outputDir, path.basename(page.ogImagePath)),
      title: page.title,
      description: page.description,
      eyebrow: page.eyebrow,
    });
  }

  for (const node of result.data.allMarkdownRemark.nodes) {
    const slug = node.fields.slug;
    await generateOgImage({
      outputPath: path.join(outputDir, "posts", `${slug}.jpg`),
      title: node.frontmatter.title,
      description: node.frontmatter.description || node.excerpt,
      eyebrow: "Blog Post",
    });
  }
};
