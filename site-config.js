const siteConfig = {
  title: "Osmar Petry",
  shortName: "Osmar Petry",
  alternateName: ["Osmar Petry Portfolio", "osmarpetry.dev"],
  url: "https://osmarpetry.dev",
  description:
    "Luxembourgish-Brazilian Senior Software Engineer with 10+ years building and scaling web and mobile products across EU and US distributed teams. Full-stack delivery across TypeScript and Python: product interfaces in React, Vue and Next.js, backend services with Node.js, FastAPI and Temporal, and the testing, CI/CD and observability practices that keep them reliable in production.",
  themeColor: "#6c5a9a",
  backgroundColor: "#f7f3ed",
  language: "en-US",
  locale: "en_US",
  email: "osmarpetry@gmail.com",
  linkedin: "https://www.linkedin.com/in/osmarpetry",
  github: "https://github.com/osmarpetry",
  jobTitle: "Senior Software Engineer",
  rssPath: "/rss.xml",
  heroImagePublicPath: "/assets/images/hero/osmar-hero.jpg",
  heroImageSourcePath: "static/assets/images/hero/osmar-hero.jpg",
  defaultSocialImagePath: "/assets/images/og/home.jpg",
  socialImageWidth: 1200,
  socialImageHeight: 630,
  googleAnalyticsTrackingId:
    process.env.GATSBY_GA_MEASUREMENT_ID || "G-3STVN66PY5",
  deployCommit:
    process.env.COMMIT_REF ||
    process.env.HEAD ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    "local",
  currentYear: new Date().getFullYear(),
};

module.exports = siteConfig;
