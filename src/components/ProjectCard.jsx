import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const ProjectCard = ({ project }) => {
  const images = project.images || [];
  const data = useStaticQuery(graphql`
    query ProjectCardImagesQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativeDirectory: { regex: "/^screenshots\\/projects\\//" }
        }
      ) {
        nodes {
          relativeDirectory
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 82
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `);

  const imageBySlug = new Map(
    data.allFile.nodes.map((node) => [
      node.relativeDirectory.replace(/^screenshots\/projects\//, ""),
      getImage(node.childImageSharp),
    ])
  );

  return (
    <article className="project-card">
      <div
        className={`project-media${images.length > 1 ? " project-media--gallery" : ""}`}
      >
        {images.map((image, i) => (
          image.slug && imageBySlug.get(image.slug) ? (
            <GatsbyImage
              key={i}
              image={imageBySlug.get(image.slug)}
              alt={image.alt}
              className="project-media__image-wrap"
              imgClassName="project-media__image"
            />
          ) : (
            <img
              key={i}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              width={1600}
              height={1000}
            />
          )
        ))}
      </div>
      <div className="project-body">
        {project.type && <p className="project-type">{project.type}</p>}
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        {project.stack && (
          <p className="stack-line">
            <span>Stack</span>
            {project.stack.join(" \u00B7 ")}
          </p>
        )}
        {project.links && (
          <div className="project-links">
            {project.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
