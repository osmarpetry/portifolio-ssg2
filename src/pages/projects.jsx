import { Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ProjectTierSection from "../components/ProjectTierSection";
import AboutSection from "../components/AboutSection";
import catalog from "../data/catalog";
import pageMetadata from "../data/page-metadata";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "../utils/structuredData";

const ProjectsPage = () => (
  <Layout>
    <section
      className="section section-tier-page"
      data-projects-page
      aria-label="Projects"
    >
      <div className="container">
        <div className="section-heading">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link className="breadcrumb__link" to="/">
              Home
            </Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">Projects</span>
          </nav>
          <h1 id="projects-index-heading">Projects.</h1>
          <p>
            Selected builds, experiments, and technical assessments across
            product, frontend, backend, and AI work.
          </p>
        </div>

        <ProjectTierSection
          id="projects-catalog"
          projects={catalog.projectsWithImagesOrdered}
          listProjects={catalog.projectsWithoutImagesOrdered}
          listTitle="Text-only project list"
        />
      </div>
    </section>
    <AboutSection />
  </Layout>
);

export default ProjectsPage;

export const Head = () => (
  <Seo
    title={pageMetadata.projects.title}
    description={pageMetadata.projects.description}
    pathname={pageMetadata.projects.pathname}
    image={pageMetadata.projects.ogImagePath}
    imageAlt="Projects page preview image"
    jsonLd={[
      buildCollectionPageJsonLd({
        name: "Projects",
        description: pageMetadata.projects.description,
        pathname: pageMetadata.projects.pathname,
      }),
      buildBreadcrumbJsonLd([
        { name: "Home", pathname: "/" },
        { name: "Projects", pathname: pageMetadata.projects.pathname },
      ]),
    ]}
  />
);
