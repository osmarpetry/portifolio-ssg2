import React from "react";
import SlideCard from "./SlideCard";
import { slides, PROFILE_URL } from "../data/slides";

const SlidesGallery = () => (
  <>
    <div className="slides-gallery-grid">
      {slides.map((slide) => (
        <SlideCard key={slide.slug} slide={slide} />
      ))}
    </div>

    <div className="company-teaser-cta">
      <a
        className="action-link action-link--tier"
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        View all on SlideShare ↗
      </a>
    </div>
  </>
);

export default SlidesGallery;
