import React from "react";
import companies from "../data/companies";

const HomeCompanies = () => (
  <section className="section section-companies" id="companies">
    <div className="container">
      <p className="section-companies__subtitle">
        Teams and products I've contributed to across different industries and geographies.
      </p>
      <div className="companies-grid">
        {companies.map((company) => (
          <div key={company.slug} className="company-item" title={company.name}>
            {company.brand.kind === "logo" && company.brand.src ? (
              <img
                className="company-item__logo"
                src={company.brand.src}
                alt={company.name}
                loading="lazy"
              />
            ) : (
              <span className="company-item__name">
                {company.brand.text || company.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeCompanies;
