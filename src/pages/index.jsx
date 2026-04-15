import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeroSection from "../components/HeroSection";
import HomeCompanies from "../components/HomeCompanies";
import HomeMentorship from "../components/HomeMentorship";
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
      descriptionHtml="<p><strong>Luxembourgish Senior Software Engineer</strong> with <strong>9+ years</strong> of experience building and scaling web and mobile products across EU and US distributed teams. Strong background in frontend engineering with JavaScript, TypeScript, HTML, CSS, React, unit testing, development and build tools, and CI/CD, plus practical full-stack experience with Node.js and Java-based systems.</p>"
    />
    <HomeCompanies />
    <FeaturedWork />
    <FeaturedSlides />
    <LatestPosts />
    {
      //<HomeMentorship />
    }
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
