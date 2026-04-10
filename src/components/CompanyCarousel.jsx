import React, { useRef, useCallback } from "react";
import companies from "../data/companies";

const CompanyCarousel = () => {
  const trackRef = useRef(null);

  const scrollByStep = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    const firstSlide = track.children[0];
    if (!firstSlide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const step = firstSlide.getBoundingClientRect().width + gap;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  return (
    <section className="section section-company-carousel" id="company-work">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Company Work</p>
          <h2>
            Companies, products, and internal tools shipped across different
            stages.
          </h2>
          <p>
            One company per slide, with the projects kept inside each company
            array so the order can change from data only.
          </p>
        </div>
      </div>

      <div className="company-carousel-shell" data-company-carousel>
        <div className="company-carousel-toolbar container">
          <p className="company-carousel-toolbar__label">Company timeline</p>
          <div className="company-carousel-toolbar__actions">
            <button
              className="company-carousel-button"
              type="button"
              aria-label="Previous company"
              onClick={() => scrollByStep(-1)}
            >
              &larr; Prev
            </button>
            <button
              className="company-carousel-button"
              type="button"
              aria-label="Next company"
              onClick={() => scrollByStep(1)}
            >
              Next &rarr;
            </button>
          </div>
        </div>

        <div className="company-carousel-viewport">
          <div
            className="company-carousel-track"
            ref={trackRef}
            data-company-carousel-track
          >
            {companies.map((company) => (
              <div
                key={company.slug}
                className="company-slide"
                id={`company-${company.slug}`}
              >
                <div className="company-slide__intro">
                  <div className="company-slide__brand">
                    {company.brand.kind === "logo" && company.brand.src ? (
                      <img
                        src={company.brand.src}
                        alt={company.brand.alt}
                        style={{ maxHeight: "3rem", width: "auto" }}
                        loading="lazy"
                      />
                    ) : (
                      <span className="company-wordmark">
                        {company.brand.text || company.name}
                      </span>
                    )}
                  </div>
                  <div className="company-slide__copy">
                    <h3>{company.role}</h3>
                    <p className="company-slide__period">{company.period}</p>
                    <p className="company-slide__summary">{company.summary}</p>
                  </div>
                </div>

                <div className="company-project-grid">
                  {company.projects.map((project) => (
                    <article
                      key={project.slug}
                      className="company-project-card"
                    >
                      {project.image && (
                        <figure className="company-project-card__media">
                          <img
                            src={project.image.src}
                            alt={project.image.alt}
                            loading="lazy"
                            decoding="async"
                          />
                        </figure>
                      )}
                      <div className="company-project-card__body">
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                        {project.links && (
                          <div className="project-links">
                            {project.links.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCarousel;
