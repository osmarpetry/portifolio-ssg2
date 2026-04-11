import React from "react";
import { Link } from "gatsby";
import SectionHeading from "./SectionHeading";
import { featuredSlides, PROFILE_URL } from "../data/slides";

const FeaturedSlides = () => (
  <section className="section section-home-slides" id="featured-slides">
    <div className="container">
      <SectionHeading
        eyebrow="Presentations"
        title="Most viewed SlideShare talks."
        description="Top presentations from tech talks, seminars, and knowledge-sharing sessions."
      />

      <ul className="company-teaser-list home-slide-list" aria-label="Featured slides">
        {featuredSlides.map((slide) => (
          <li key={slide.slug} className="company-teaser-item home-slide-item">
            <a
              className="company-teaser-item__link home-slide-item__link"
              href={slide.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="company-teaser-item__name home-slide-item__name">
                {slide.title}
              </span>
              <span className="company-teaser-item__meta home-slide-item__meta">
                {slide.views > 0 && (
                  <span className="company-teaser-item__role home-slide-item__views">
                    {slide.views.toLocaleString()} views
                  </span>
                )}
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
