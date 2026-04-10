import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import contactProject from "../data/contact-project";
import mentees from "../data/mentees";

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const HomeMentorship = () => (
  <section className="section section-mentorship" id="mentorship">
    <div className="container">
      <div className="mentorship-layout">
        <div className="mentorship-visual">
          <StaticImage
            src="../../static/assets/images/hero/osmar-mentor-1.jpeg"
            alt="Osmar during a mentorship conversation"
            className="mentorship-visual__photo mentorship-visual__photo--1"
            imgClassName="mentorship-visual__photo-image"
            loading="lazy"
            placeholder="blurred"
            quality={80}
            formats={["auto", "webp", "avif"]}
          />
          <StaticImage
            src="../../static/assets/images/hero/osmar-mentor-2.jpeg"
            alt="Osmar offering guidance during a mentoring session"
            className="mentorship-visual__photo mentorship-visual__photo--2"
            imgClassName="mentorship-visual__photo-image"
            loading="lazy"
            placeholder="blurred"
            quality={80}
            formats={["auto", "webp", "avif"]}
          />
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

      <ul className="mentee-list" aria-label="Mentees">
        {mentees.map((mentee) => (
          <li key={mentee.name} className="mentee-item">
            <div className="mentee-avatar-shell" aria-hidden="true">
              {mentee.avatar ? (
                <img
                  src={mentee.avatar.src}
                  alt=""
                  className="mentee-avatar-image"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="mentee-avatar">{getInitials(mentee.name)}</div>
              )}
            </div>
            <div className="mentee-content">
              <blockquote className="mentee-quote">
                <p>&ldquo;{mentee.quote}&rdquo;</p>
              </blockquote>
              <span className="mentee-name">{mentee.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HomeMentorship;
