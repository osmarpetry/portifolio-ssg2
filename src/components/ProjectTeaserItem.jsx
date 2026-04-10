import React from "react";

const ProjectTeaserItem = ({ project }) => {
  const primaryLink =
    (project.githubLinks && project.githubLinks[0]) ||
    (project.links && project.links[0]);

  return (
    <li
      className="company-teaser-item project-teaser-item"
      id={project.slug}
      data-project-card={project.slug}
      data-project-aliases={
        project.repos?.length ? project.repos.join(",") : undefined
      }
    >
      <a
        className="company-teaser-item__link project-teaser-item__link"
        href={primaryLink?.url}
        target="_blank"
        rel="noreferrer"
      >
        <span className="company-teaser-item__name project-teaser-item__name">
          {project.repos?.join(" + ")}
        </span>
        <span className="company-teaser-item__meta project-teaser-item__meta">
          <span className="company-teaser-item__role project-teaser-item__summary">
            {project.summary}
          </span>
          <span className="company-teaser-item__count project-teaser-item__chip">
            {project.tierLabel || `Tier ${project.tier}`}
          </span>
          {(project.stack || []).map((item, i) => (
            <span
              key={i}
              className="company-teaser-item__count project-teaser-item__chip"
            >
              {item}
            </span>
          ))}
        </span>
      </a>
    </li>
  );
};

export default ProjectTeaserItem;
