import React from "react";

const SectionHeading = ({
  eyebrow,
  title,
  description,
  level = "h2",
  id,
  href,
}) => {
  const HeadingTag = level;
  const titleContent = href ? (
    <a className="section-title-link" href={href}>
      {title}
    </a>
  ) : (
    title
  );

  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <HeadingTag id={id}>{titleContent}</HeadingTag>
      {description && <p>{description}</p>}
    </div>
  );
};

export default SectionHeading;
