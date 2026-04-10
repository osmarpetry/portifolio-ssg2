import React from "react";
import { Link } from "gatsby";
import ProjectCard from "./ProjectCard";
import ProjectTeaserItem from "./ProjectTeaserItem";

const ProjectTierSection = ({
  id,
  eyebrow,
  title,
  description,
  titleHref,
  projects = [],
  listProjects = [],
  listTitle,
  ctaUrl,
  ctaLabel,
  className,
  dataTier,
  hidden,
}) => {
  const hasHeading = eyebrow || title || description;

  return (
    <section
      className={`tier-section${className ? ` ${className}` : ""}`}
      id={id}
      data-tier-panel={dataTier || undefined}
      hidden={hidden || undefined}
    >
      {hasHeading && (
        <div className="section-heading">
          {titleHref ? (
            <a className="section-heading-link" href={titleHref}>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              {title && <h2>{title}</h2>}
              {description && <p>{description}</p>}
            </a>
          ) : (
            <>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              {title && <h2>{title}</h2>}
              {description && <p>{description}</p>}
            </>
          )}
        </div>
      )}

      {projects.length > 0 && (
        <div className="project-grid">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="project-card-frame"
              id={project.slug}
              data-project-card={project.slug}
              data-project-aliases={
                project.repos?.length ? project.repos.join(",") : undefined
              }
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      {listProjects.length > 0 && (
        <ul
          className="company-teaser-list project-teaser-list"
          aria-label={listTitle || "More projects"}
        >
          {listProjects.map((project) => (
            <ProjectTeaserItem key={project.slug} project={project} />
          ))}
        </ul>
      )}

      {ctaUrl && ctaLabel && (
        <div className="tier-section__cta">
          <Link className="action-link action-link--tier" to={ctaUrl}>
            {ctaLabel}
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProjectTierSection;
