import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description, pathname }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          themeColor
        }
      }
    }
  `);

  const meta = site.siteMetadata;
  const resolvedTitle = title || meta.title;
  const resolvedDescription = description || meta.description;
  const canonicalUrl = `${meta.siteUrl}${pathname || ""}`;

  return (
    <>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="theme-color" content={meta.themeColor} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={meta.title} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={meta.title} />
      <link rel="icon" href="/assets/icons/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
    </>
  );
};

export default Seo;
