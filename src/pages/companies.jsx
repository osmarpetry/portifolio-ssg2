import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import CompanyCarousel from "../components/CompanyCarousel";
import AboutSection from "../components/AboutSection";

const CompaniesPage = () => (
  <Layout>
    <CompanyCarousel />
    <AboutSection />
  </Layout>
);

export default CompaniesPage;

export const Head = () => (
  <Seo title="Companies — Osmar Petry" pathname="/companies/" />
);
