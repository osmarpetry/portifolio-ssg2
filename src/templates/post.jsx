import React from "react";
import { graphql } from "gatsby";
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

const PostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const { title, date, tags, description } = post.frontmatter;

  return (
    <Layout>
      <section className="section section-markdown-page">
        <div className="container">
          <div className="markdown-page__header">
            <div className="markdown-page__header-copy">
              <p className="eyebrow">Post</p>
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

          <div
            className="markdown-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
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
