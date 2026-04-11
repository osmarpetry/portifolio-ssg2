import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import SlidesGallery from "../components/SlidesGallery";
import pageMetadata from "../data/page-metadata";
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "../utils/structuredData";

const SlidesPage = () => (
  <Layout>
    <section className="section section-slides-page">
      <div className="container">
        <div className="section-heading">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a className="breadcrumb__link" href="/">
              Home
            </a>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">Slides</span>
          </nav>
          <h1>Slides.</h1>
          <p>
            Presentations from tech talks, university seminars, and
            knowledge-sharing sessions.
          </p>
        </div>

        <SlidesGallery />
      </div>
    </section>
  </Layout>
);

export default SlidesPage;

export const Head = () => (
  <Seo
    title={pageMetadata.slides.title}
    description={pageMetadata.slides.description}
    pathname={pageMetadata.slides.pathname}
    image={pageMetadata.slides.ogImagePath}
    imageAlt="Slides page preview image"
    jsonLd={[
      buildCollectionPageJsonLd({
        name: "Osmar Petry Presentations",
        description: pageMetadata.slides.description,
        pathname: pageMetadata.slides.pathname,
      }),
      buildBreadcrumbJsonLd([
        { name: "Home", pathname: "/" },
        { name: "Slides", pathname: pageMetadata.slides.pathname },
      ]),
    ]}
  />
);
