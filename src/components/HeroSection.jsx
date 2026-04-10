import React from "react";
import siteData from "../data/site";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.78c-2.94.64-3.56-1.25-3.56-1.25-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.07 1.6 1.07.94 1.59 2.45 1.13 3.05.86.09-.67.37-1.13.66-1.39-2.35-.26-4.82-1.16-4.82-5.18 0-1.14.41-2.06 1.08-2.79-.11-.27-.47-1.35.1-2.81 0 0 .88-.28 2.89 1.06a10.2 10.2 0 0 1 5.26 0c2.01-1.34 2.89-1.06 2.89-1.06.57 1.46.21 2.54.1 2.81.67.73 1.08 1.65 1.08 2.79 0 4.03-2.47 4.92-4.83 5.18.38.33.72.99.72 2v2.97c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M6.94 8.27H3.56V20.5h3.38V8.27Zm.22-3.78a1.96 1.96 0 1 0-3.92 0 1.96 1.96 0 0 0 3.92 0ZM20.5 13.02c0-3.68-1.96-5.39-4.58-5.39-2.11 0-3.06 1.16-3.59 1.98v-1.7H8.96c.04 1.13 0 12.59 0 12.59h3.37v-7.03c0-.38.03-.75.14-1.02.31-.75 1.03-1.53 2.23-1.53 1.57 0 2.2 1.2 2.2 2.97v6.61h3.38v-7.48Z"
      fill="currentColor"
    />
  </svg>
);

const HeroSection = ({
  backgroundImage,
  backgroundColor = "#203629",
  position = "left",
  title,
  descriptionHtml,
}) => {
  const isFooterHero = position === "right";
  const sectionClass = isFooterHero
    ? "hero section hero--footer section-about"
    : "hero section hero--home";
  const sectionId = isFooterHero ? "about" : "intro";

  return (
    <section className={sectionClass} id={sectionId}>
      <div className="container">
        <div
          className={`hero-banner hero-banner--${position}`}
          style={{ "--hero-background-color": backgroundColor }}
        >
          <div className="hero-media">
            <img
              className="hero-media__image"
              src={backgroundImage}
              alt=""
              loading={isFooterHero ? "lazy" : "eager"}
              decoding="async"
            />
          </div>
          <div className={`hero-card hero-card--${position}`}>
            {isFooterHero ? <h2>{title}</h2> : <h1>{title}</h1>}
            <div
              className="hero-description"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
            <div className="hero-actions">
              <a
                className="action-link action-link--primary"
                href="/assets/resume/osmar-petry-resume-en.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download resume
              </a>
              <div className="hero-socials" aria-label="Social links">
                <a
                  className="hero-social-link"
                  href={siteData.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                >
                  <GithubIcon />
                </a>
                <a
                  className="hero-social-link"
                  href={siteData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
            <p className="hero-contact-line">
              Write to{" "}
              <a href={`mailto:${siteData.email}`}>{siteData.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
