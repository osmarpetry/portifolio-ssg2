import React from "react";
import contactProject from "../data/contact-project";

const HomeMentorship = () => (
  <section className="section section-mentorship" id="mentorship">
    <div className="container">
      <div className="mentorship-layout">
        <div className="mentorship-visual">
          {contactProject.images.map((image, i) => (
            <img
              key={i}
              src={image.src}
              alt={image.alt}
              className={`mentorship-visual__photo mentorship-visual__photo--${i + 1}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
        <div className="mentorship-info">
          <span className="mentorship-info__label">Mentorship</span>
          <h2 className="mentorship-info__title">Helping engineers grow</h2>
          <p className="mentorship-info__text">
            Frontend, product thinking, and engineering judgment.
          </p>
          <a
            href={contactProject.links[0].url}
            target="_blank"
            rel="noreferrer"
            className="mentorship-info__link"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HomeMentorship;
