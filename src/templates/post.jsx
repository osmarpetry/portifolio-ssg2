import React, { useEffect, useRef } from "react";
import { Link, graphql } from "gatsby";
import hljs from "highlight.js";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const decodeHtmlEntities = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#96;/g, "`");

const highlightLanguageAliases = {
  html: "xml",
  js: "javascript",
  jsx: "javascript",
  md: "markdown",
  sh: "bash",
  shell: "bash",
  ts: "typescript",
  tsx: "typescript",
  yml: "yaml",
  zsh: "bash",
};

const highlightCodeBlock = (language, encodedCode) => {
  const normalizedLanguage = (
    highlightLanguageAliases[language?.toLowerCase()] ||
    language ||
    ""
  ).toLowerCase();
  const decodedCode = decodeHtmlEntities(encodedCode);

  if (normalizedLanguage && hljs.getLanguage(normalizedLanguage)) {
    const highlightedCode = hljs.highlight(decodedCode, {
      language: normalizedLanguage,
      ignoreIllegals: true,
    }).value;

    return `<pre><code class="hljs language-${normalizedLanguage}">${highlightedCode}</code></pre>`;
  }

  const highlightedCode = hljs.highlightAuto(decodedCode).value;
  return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
};

const enhancePostHtml = (html) => {
  const highlightedCodeBlocks = [];

  const htmlWithCodePlaceholders = html.replace(
    /<pre><code(?: class="language-([^"]+)")?>([\s\S]*?)<\/code><\/pre>/g,
    (_, language = "", encodedCode) => {
      const placeholder = `__CODE_BLOCK_${highlightedCodeBlocks.length}__`;
      highlightedCodeBlocks.push(highlightCodeBlock(language, encodedCode));
      return placeholder;
    }
  );

  return htmlWithCodePlaceholders.replace(
    /__CODE_BLOCK_(\d+)__/g,
    (_, index) => highlightedCodeBlocks[Number(index)] || ""
  );
};

const PostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const { title, date, tags, description } = post.frontmatter;
  const slug = post.fields.slug;
  const currentCrumbRef = useRef(null);
  const currentCrumbTextRef = useRef(null);
  const proseRef = useRef(null);

  const fromTag = location?.state?.fromTag || null;
  const renderedHtml = enhancePostHtml(post.html);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const currentCrumb = currentCrumbRef.current;
    const currentCrumbText = currentCrumbTextRef.current;

    if (!currentCrumb || !currentCrumbText) return undefined;

    const updateBreadcrumbOverflow = () => {
      const overflow = Math.max(
        0,
        currentCrumbText.scrollWidth - currentCrumb.clientWidth
      );

      currentCrumb.style.setProperty(
        "--breadcrumb-overflow",
        `${overflow}px`
      );
      currentCrumb.style.setProperty(
        "--breadcrumb-scroll-duration",
        `${Math.max(1.2, overflow / 48)}s`
      );
      currentCrumb.dataset.overflowing = overflow > 0 ? "true" : "false";
    };

    updateBreadcrumbOverflow();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateBreadcrumbOverflow)
        : null;

    resizeObserver?.observe(currentCrumb);
    resizeObserver?.observe(currentCrumbText);
    window.addEventListener("resize", updateBreadcrumbOverflow);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateBreadcrumbOverflow);
    };
  }, [slug, fromTag]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const prose = proseRef.current;

    if (!prose) return undefined;

    const tooltipTimers = new Map();

    const hideTooltip = (element) => {
      element.dataset.tooltipVisible = "false";
      const activeTimer = tooltipTimers.get(element);

      if (activeTimer) {
        window.clearTimeout(activeTimer);
        tooltipTimers.delete(element);
      }
    };

    const showTooltip = (element) => {
      hideTooltip(element);
      element.dataset.tooltipVisible = "true";

      const timer = window.setTimeout(() => {
        element.dataset.tooltipVisible = "false";
        tooltipTimers.delete(element);
      }, 1800);

      tooltipTimers.set(element, timer);
    };

    const handleClick = (event) => {
      const missingLink = event.target.closest(".post-inline-link--missing");

      if (!missingLink || !prose.contains(missingLink)) return;

      event.preventDefault();
      showTooltip(missingLink);
    };

    const handleMouseLeave = (event) => {
      const missingLink = event.target.closest(".post-inline-link--missing");

      if (!missingLink || !prose.contains(missingLink)) return;

      hideTooltip(missingLink);
    };

    prose.addEventListener("click", handleClick);
    prose.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      prose.removeEventListener("click", handleClick);
      prose.removeEventListener("mouseleave", handleMouseLeave, true);

      for (const timer of tooltipTimers.values()) {
        window.clearTimeout(timer);
      }
    };
  }, [slug]);

  return (
    <Layout>
      <section className="section section-markdown-page">
        <div className="container">
          <div ref={proseRef} className="markdown-prose">
            <div className="post-page__header">
              <div className="markdown-page__header-copy">
                <nav className="breadcrumb" aria-label="Breadcrumb">
                  <Link className="breadcrumb__link" to="/posts/">
                    Blog
                  </Link>
                  {fromTag && (
                    <>
                      <span className="breadcrumb__sep" aria-hidden="true">/</span>
                      <Link
                        className="breadcrumb__link"
                        to={`/posts/#tag=${encodeURIComponent(fromTag)}`}
                      >
                        {fromTag}
                      </Link>
                    </>
                  )}
                  <span className="breadcrumb__sep" aria-hidden="true">/</span>
                  <span
                    ref={currentCrumbRef}
                    className="breadcrumb__current breadcrumb__current--truncate"
                    aria-label={slug}
                    title={slug}
                  >
                    <span
                      ref={currentCrumbTextRef}
                      className="breadcrumb__current-text"
                    >
                      {slug}
                    </span>
                  </span>
                </nav>
                <h1 className="markdown-page__title">{title}</h1>
                {description && (
                  <p className="markdown-page__description">{description}</p>
                )}
              </div>
              <div className="markdown-page__meta">
                <time dateTime={date}>{formatDate(date)}</time>
                {tags && (
                  <div className="markdown-page__tags">
                    {tags.map((tag, i) => (
                      <span key={i} className="markdown-page__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PostTemplate;

export const Head = ({ data }) => {
  const { title, description } = data.markdownRemark.frontmatter;
  const slug = data.markdownRemark.fields.slug;
  return (
    <Seo
      title={`${title} — Osmar Petry`}
      description={description}
      pathname={`/posts/${slug}/`}
    />
  );
};

export const query = graphql`
  query PostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date
        tags
        description
      }
      fields {
        slug
      }
    }
  }
`;
