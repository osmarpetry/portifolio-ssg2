import React from "react";
import SlideCard from "./SlideCard";
import { slides } from "../data/slides";

const SlidesGallery = () => (
  <div className="slides-gallery-grid">
    {slides.map((slide) => (
      <SlideCard key={slide.slug} slide={slide} />
    ))}
  </div>
);

export default SlidesGallery;
