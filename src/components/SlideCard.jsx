import React from "react";

const PLACEHOLDER_SRC = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' fill='%23f1ebfb'%3E%3Crect width='320' height='180'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,sans-serif' font-size='14' fill='%236c5a9a'%3ESlides%3C/text%3E%3C/svg%3E";

const SlideCard = ({ slide }) => {
  const imgSrc = slide.thumbnail || PLACEHOLDER_SRC;

  return (
    <article className="slide-card">
      <a
        className="slide-card__link"
        href={slide.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Open "${slide.title}" on SlideShare`}
      >
        <div className="slide-card__thumb-wrap">
          <img
            className="slide-card__thumb"
            src={imgSrc}
            alt={`Thumbnail for ${slide.title}`}
            loading="lazy"
            width={320}
            height={180}
          />
        </div>
        <div className="slide-card__body">
          <h3 className="slide-card__title">{slide.title}</h3>
          {slide.description && (
            <p className="slide-card__description">{slide.description}</p>
          )}
          <div className="slide-card__meta">
            {slide.topics.slice(0, 2).map((topic, i) => (
              <span key={i} className="slide-card__topic">
                {topic}
              </span>
            ))}
          </div>
        </div>
        <span className="slide-card__external" aria-hidden="true">
          ↗
        </span>
      </a>

      <div className="slide-card__actions">
        <a
          className="slide-card__download"
          href={slide.pdfPath}
          download={`${slide.slug}.pdf`}
          title={`Download "${slide.title}" as PDF`}
        >
          Download PDF
        </a>
      </div>
    </article>
  );
};

export default SlideCard;
