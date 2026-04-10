import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeroSection from "../components/HeroSection";
import HomeCompanies from "../components/HomeCompanies";
import HomeMentorship from "../components/HomeMentorship";
import FeaturedWork from "../components/FeaturedWork";
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
      descriptionHtml="<p><strong>Senior Software Engineer</strong> with <strong>9+ years</strong> building and scaling web and mobile products across EU and US distributed teams, with a frontend-focused full stack background in React, Next.js, TypeScript, and Node.js.</p>"
    />
    <HomeCompanies />
    <FeaturedWork />
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
