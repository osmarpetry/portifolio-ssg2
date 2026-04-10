import React from "react";

const ProjectCard = ({ project }) => {
  const images = project.images || [];

  return (
    <article className="project-card">
      <div
        className={`project-media${images.length > 1 ? " project-media--gallery" : ""}`}
      >
        {images.map((image, i) => (
          <img
            key={i}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            width={1600}
            height={1000}
          />
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
