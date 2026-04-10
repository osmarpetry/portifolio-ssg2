import React from "react";
import companies from "../data/companies";
import SectionHeading from "./SectionHeading";

const visibleCompanies = companies.filter(
  (c) => c.brand.kind === "logo" && c.brand.src
);

const HomeCompanies = () => (
  <section className="section section-companies" id="companies">
    <div className="container">
      <SectionHeading
        eyebrow="Some companies I already worked with"
        title="Companies"
        level="h2"
      />
      <div className="companies-grid">
        {visibleCompanies.map((company) => (
          <div key={company.slug} className="company-item" title={company.name}>
            <img
              className="company-item__logo"
              src={company.brand.src}
              alt={company.brand.alt || company.name}
              loading="lazy"
              width={company.brand.width}
              height={company.brand.height}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeCompanies;
