/**
 * SlideShare presentations by Osmar Petry.
 * Sorted by views descending (most popular first).
 *
 * @typedef {Object} Slide
 * @property {string} slug - URL-safe identifier
 * @property {string} title - Presentation title
 * @property {string} description - Short presentation summary
 * @property {string} url - Full SlideShare URL
 * @property {number} views - Approximate view count
 * @property {number} slideCount - Number of slides
 * @property {string} thumbnail - CDN thumbnail URL
 * @property {string} publishedDate - Approximate publish date (YYYY-MM)
 * @property {string[]} topics - Topic tags
 */

const DEFAULT_PROFILE_URL = "https://www.slideshare.net/OsmarPetry";
const slidesCache = require("./slides-cache.json");

const PROFILE_URL = slidesCache.profileUrl || DEFAULT_PROFILE_URL;
const slides = Array.isArray(slidesCache.slides) ? slidesCache.slides : [];
const featuredSlides = slides.slice(0, 3);

module.exports = { slides, featuredSlides, PROFILE_URL };
