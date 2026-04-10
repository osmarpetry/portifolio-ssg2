import React, { useState, useEffect, useCallback } from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import pageMetadata from "../data/page-metadata";
import {
  buildBlogJsonLd,
  buildBreadcrumbJsonLd,
} from "../utils/structuredData";

const normalizeSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PostsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  const allTags = Array.from(
    new Set(
      posts.flatMap((p) =>
        (p.frontmatter.tags || []).map((t) => t)
      )
    )
  ).map((tag) => ({ label: tag, slug: normalizeSlug(tag) }));

  const [activeTag, setActiveTag] = useState("");

  const getTagFromLocation = useCallback(() => {
    if (typeof window === "undefined") return "";
    const hash = window.location.hash.replace(/^#/, "").trim();
    if (hash.startsWith("tag=")) return decodeURIComponent(hash.slice(4));
    if (hash) return decodeURIComponent(hash);
    return new URLSearchParams(window.location.search).get("tag") || "";
  }, []);

  useEffect(() => {
    setActiveTag(getTagFromLocation());

    const handleHash = () => setActiveTag(getTagFromLocation());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [getTagFromLocation]);

  const applyFilter = (tagSlug) => {
    setActiveTag(tagSlug);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (tagSlug) {
      url.searchParams.delete("tag");
      url.hash = `tag=${encodeURIComponent(tagSlug)}`;
    } else {
      url.searchParams.delete("tag");
      url.hash = "";
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const normalizedActive = activeTag.trim().toLowerCase();
  const filteredPosts = normalizedActive
    ? posts.filter((post) =>
        (post.frontmatter.tags || [])
          .map((t) => normalizeSlug(t))
          .includes(normalizedActive)
      )
    : posts;

  const activeTagLabel = normalizedActive
    ? allTags.find((t) => t.slug === normalizedActive)?.label || activeTag
    : "";
  const currentFilterLabel = activeTagLabel || "All Posts";

  const statusText = normalizedActive
    ? `${filteredPosts.length} post${filteredPosts.length === 1 ? "" : "s"} in ${activeTagLabel}`
    : `${allTags.length} tags`;

  return (
    <Layout>
      <section className="section section-posts-index" data-posts-index>
        <div className="container">
          <div className="section-heading">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <button
                className="breadcrumb__link"
                type="button"
                onClick={() => applyFilter("")}
              >
                Blog
              </button>
              <span className="breadcrumb__sep" aria-hidden="true">/</span>
              <span className="breadcrumb__current">{currentFilterLabel}</span>
            </nav>
            <h1 id="posts-index-heading">Blog.</h1>
            <p>
              Notes and articles about code, product thinking, and experiments
              published from this site.
            </p>
          </div>

          <div className="posts-filter">
            <details className="posts-filter__details" open>
              <summary className="posts-filter__summary">
                <span>Filter by tag</span>
                <span className="posts-filter__status">{statusText}</span>
              </summary>
              <div className="posts-filter__chips">
                <button
                  className={`posts-filter__chip${!normalizedActive ? " is-active" : ""}`}
                  type="button"
                  onClick={() => applyFilter("")}
                >
                  All posts
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag.slug}
                    className={`posts-filter__chip${normalizedActive === tag.slug ? " is-active" : ""}`}
                    type="button"
                    onClick={() => applyFilter(tag.slug)}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </details>
          </div>

          <ul className="posts-index-list" role="list">
            {filteredPosts.map((post) => (
              <li key={post.id} className="posts-index-item">
                <Link
                  className="posts-index-card"
                  to={`/posts/${post.fields.slug}/`}
                  state={{ fromTag: normalizedActive || null }}
                >
                  <div className="posts-index-card__meta">
                    <time dateTime={post.frontmatter.date}>
                      {formatDate(post.frontmatter.date)}
                    </time>
                  </div>
                  <h2 className="posts-index-card__title">
                    {post.frontmatter.title}
                  </h2>
                  {post.frontmatter.tags && (
                    <div className="posts-index-card__tags" aria-label="Post tags">
                      {post.frontmatter.tags.map((tag, i) => (
                        <span key={i} className="posts-index-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {post.frontmatter.description && (
                    <p className="posts-index-card__description">
                      {post.frontmatter.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {filteredPosts.length === 0 && (
            <p className="posts-index-empty">
              No posts matched the selected tag.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PostsPage;

export const Head = () => (
  <>
    <Seo
      title={pageMetadata.posts.title}
      description={pageMetadata.posts.description}
      pathname={pageMetadata.posts.pathname}
      image={pageMetadata.posts.ogImagePath}
      imageAlt="Blog page preview image"
      jsonLd={[
        buildBlogJsonLd({
          name: "Osmar Petry Blog",
          description: pageMetadata.posts.description,
          pathname: pageMetadata.posts.pathname,
        }),
        buildBreadcrumbJsonLd([
          { name: "Home", pathname: "/" },
          { name: "Posts", pathname: pageMetadata.posts.pathname },
        ]),
      ]}
    />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Osmar Petry RSS Feed"
      href="/rss.xml"
    />
  </>
);

export const query = graphql`
  query PostsPageQuery {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { slug: { ne: "resume" } } }
    ) {
      nodes {
        id
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
  }
`;
