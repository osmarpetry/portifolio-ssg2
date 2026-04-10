import siteData from "../data/site";

const absoluteUrl = (pathname = "/") => new URL(pathname, siteData.url).toString();

export const buildBreadcrumbJsonLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.pathname),
  })),
});

export const buildWebSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteData.title,
  alternateName: siteData.alternateName,
  url: absoluteUrl("/"),
});

export const buildPersonJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteData.title,
  jobTitle: siteData.jobTitle,
  url: absoluteUrl("/"),
  image: absoluteUrl(siteData.heroImagePublicPath),
  email: `mailto:${siteData.email}`,
  sameAs: [siteData.github, siteData.linkedin],
});

export const buildCollectionPageJsonLd = ({ name, description, pathname }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name,
  description,
  url: absoluteUrl(pathname),
  isPartOf: {
    "@type": "WebSite",
    name: siteData.title,
    url: absoluteUrl("/"),
  },
});

export const buildBlogJsonLd = ({ name, description, pathname }) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name,
  description,
  url: absoluteUrl(pathname),
  publisher: {
    "@type": "Person",
    name: siteData.title,
    url: absoluteUrl("/"),
  },
});

export const buildProfilePageJsonLd = ({ name, description, pathname }) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name,
  description,
  url: absoluteUrl(pathname),
  about: buildPersonJsonLd(),
});

export const buildArticleJsonLd = ({
  title,
  description,
  pathname,
  imagePath,
  datePublished,
  tags = [],
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url: absoluteUrl(pathname),
  mainEntityOfPage: absoluteUrl(pathname),
  datePublished,
  dateModified: datePublished,
  image: [absoluteUrl(imagePath)],
  author: {
    "@type": "Person",
    name: siteData.title,
    url: absoluteUrl("/"),
  },
  publisher: {
    "@type": "Person",
    name: siteData.title,
    url: absoluteUrl("/"),
  },
  keywords: tags.length ? tags.join(", ") : undefined,
});

export { absoluteUrl };
