import React from "react";
import { Link } from "gatsby";
import SectionHeading from "./SectionHeading";
import { featuredSlides } from "../data/slides";

const FeaturedSlides = () => (
  <section className="section section-home-slides" id="featured-slides">
    <div className="container">
      <SectionHeading
        eyebrow="Presentations"
        title="Slides from talks, workshops, and seminars."
        description="A selection of presentation decks from talks, workshops, and seminars I have given."
      />

      <ul className="company-teaser-list home-slide-list" aria-label="Featured slides">
        {featuredSlides.map((slide) => (
          <li key={slide.slug} className="company-teaser-item home-slide-item">
            <a
              className="company-teaser-item__link home-slide-item__link"
              href={slide.pdfPath}
              target="_blank"
              rel="noreferrer"
            >
              <span className="company-teaser-item__name home-slide-item__name">
                {slide.title}
              </span>
              <span className="company-teaser-item__meta home-slide-item__meta">
                {slide.topics.slice(0, 2).map((topic, i) => (
                  <span
                    key={i}
                    className="company-teaser-item__count home-slide-item__chip"
                  >
                    {topic}
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="company-teaser-cta">
        <Link
          className="action-link action-link--tier"
          to="/slides/"
        >
          See all presentations
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedSlides;
