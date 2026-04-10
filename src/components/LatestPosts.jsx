import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import SectionHeading from "./SectionHeading";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const LatestPosts = () => {
  const data = useStaticQuery(graphql`
    query LatestPostsQuery {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { fields: { slug: { ne: "resume" } } }
        limit: 4
      ) {
        nodes {
          id
          frontmatter {
            title
            date
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.nodes;

  return (
    <section className="section section-home-posts" id="latest-posts">
      <div className="container">
        <SectionHeading
          eyebrow="Latest writing"
          title="Recent posts from the blog."
          description="Short previews from the blog, using the same fast-scanning list rhythm as the rest of the portfolio."
        />

        <ul className="company-teaser-list home-post-list" aria-label="Latest posts">
          {posts.map((post) => (
            <li key={post.id} className="company-teaser-item home-post-item">
              <Link
                className="company-teaser-item__link home-post-item__link"
                to={`/posts/${post.fields.slug}/`}
              >
                <span className="company-teaser-item__name home-post-item__name">
                  {post.frontmatter.title}
                </span>
                <span className="company-teaser-item__meta home-post-item__meta">
                  <span className="company-teaser-item__role home-post-item__date">
                    <time dateTime={post.frontmatter.date}>
                      {formatDate(post.frontmatter.date)}
                    </time>
                  </span>
                  {(post.frontmatter.tags || []).slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="company-teaser-item__count home-post-item__chip"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="company-teaser-cta">
          <Link className="action-link action-link--tier" to="/posts/">
            Open the blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
