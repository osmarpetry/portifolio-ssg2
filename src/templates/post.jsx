import React from "react";
import { Link, graphql } from "gatsby";
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

const PostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const { title, date, tags, description } = post.frontmatter;
  const slug = post.fields.slug;

  const fromTag = location?.state?.fromTag || null;

  return (
    <Layout>
      <section className="section section-markdown-page">
        <div className="container">
          <div className="markdown-prose">
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
                  <span className="breadcrumb__current">{slug}</span>
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
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
