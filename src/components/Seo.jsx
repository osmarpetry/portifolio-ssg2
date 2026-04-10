import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import GoogleAnalytics from "./GoogleAnalytics";

const resolveUrl = (siteUrl, value = "/") => new URL(value, siteUrl).toString();

const Seo = ({
  title,
  description,
  pathname = "/",
  image,
  imageAlt,
  type = "website",
  noindex = false,
  jsonLd = [],
  article,
}) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          locale
          defaultSocialImagePath
          socialImageWidth
          socialImageHeight
        }
      }
    }
  `);

  const meta = site.siteMetadata;
  const resolvedTitle = title || meta.title;
  const resolvedDescription = description || meta.description;
  const canonicalUrl = resolveUrl(meta.siteUrl, pathname);
  const resolvedImage = resolveUrl(
    meta.siteUrl,
    image || meta.defaultSocialImagePath
  );
  const resolvedImageAlt =
    imageAlt || `${resolvedTitle} social sharing preview image`;
  const structuredData = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return (
    <>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={meta.title} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:locale" content={meta.locale} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:alt" content={resolvedImageAlt} />
      <meta
        property="og:image:width"
        content={String(meta.socialImageWidth)}
      />
      <meta
        property="og:image:height"
        content={String(meta.socialImageHeight)}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={resolvedImageAlt} />
      <link rel="icon" href="/assets/icons/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
      {article?.publishedTime && (
        <meta
          property="article:published_time"
          content={article.publishedTime}
        />
      )}
      {article?.modifiedTime && (
        <meta
          property="article:modified_time"
          content={article.modifiedTime}
        />
      )}
      {(article?.tags || []).map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      {structuredData.filter(Boolean).map((schema, index) => (
        <script
          key={`${canonicalUrl}-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <GoogleAnalytics />
    </>
  );
};

export default Seo;
