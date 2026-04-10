import React from "react";
import HeroSection from "./HeroSection";

const AboutSection = () => (
  <HeroSection
    imageVariant="about"
    backgroundColor="#2a4639"
    position="right"
    title="About me"
    descriptionHtml={`<p>Based in Luxembourg, I work best in frontend-focused full stack product environments where UI quality, backend integrations, testing, performance, and developer experience all need to hold together in production.</p><p>The strongest fit is product platform work across web and mobile: scheduling, admin surfaces, operational workflows, realtime behavior, and maintainable systems that other engineers can extend safely as the product grows.</p>`}
  />
);

export default AboutSection;
