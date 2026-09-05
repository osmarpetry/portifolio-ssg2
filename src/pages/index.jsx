import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeroSection from "../components/HeroSection";
import HomeCompanies from "../components/HomeCompanies";
import FeaturedWork from "../components/FeaturedWork";
import FeaturedSlides from "../components/FeaturedSlides";
import LatestPosts from "../components/LatestPosts";
import pageMetadata from "../data/page-metadata";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "../utils/structuredData";

const IndexPage = () => (
  <Layout>
    <HeroSection
      imageVariant="home"
      backgroundColor="#203629"
      position="left"
      title="Osmar Petry"
      descriptionHtml="<p><strong>Luxembourgish Senior Software Engineer</strong> with <strong>10+ years</strong> building and scaling web and mobile products across EU and US distributed teams. Full-stack delivery across TypeScript and Python: product interfaces in React, Vue and Next.js, backend services with Node.js, FastAPI and Temporal, and the testing, CI/CD and observability practices that keep them reliable in production.</p>"
    />
    <HomeCompanies />
    <FeaturedWork />
    <FeaturedSlides />
    <LatestPosts />
  </Layout>
);

export default IndexPage;

export const Head = () => (
  <Seo
    title={pageMetadata.home.title}
    description={pageMetadata.home.description}
    pathname={pageMetadata.home.pathname}
    image={pageMetadata.home.ogImagePath}
    imageAlt="Osmar Petry portfolio hero preview image"
    jsonLd={[buildWebSiteJsonLd(), buildPersonJsonLd()]}
  />
);
