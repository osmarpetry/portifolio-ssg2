import React from "react";
import catalog from "../data/catalog";
import ProjectTierSection from "./ProjectTierSection";

const FeaturedWork = () => (
  <section className="section section-work" id="selected-work">
    <div className="container">
      <ProjectTierSection
        id="tier-1-projects"
        eyebrow="Independent work"
        title="Projects, experiments, and assessments."
        titleHref="/#selected-work"
        description="Selected self-directed builds kept separate from professional company work. The projects page preserves the tier order, but the intent here is independent exploration and implementation range."
        projects={catalog.homeTier1PreviewProjects}
        listProjects={[]}
        ctaUrl="/projects/"
        ctaLabel="See all independent projects"
      />
    </div>
  </section>
);

export default FeaturedWork;
