const pageMetadata = {
  home: {
    pathname: "/",
    title: "Osmar Petry",
    description:
      "Luxembourgish Senior Software Engineer with 9+ years of experience building and scaling web and mobile products across EU and US distributed teams. Strong background in frontend engineering with JavaScript, TypeScript, HTML, CSS, React, unit testing, development and build tools, and CI/CD, plus practical full-stack experience with Node.js and Java-based systems.",
    ogImagePath: "/assets/images/og/home.jpg",
  },
  projects: {
    pathname: "/projects/",
    title: "Projects — Osmar Petry",
    description:
      "Selected software projects, experiments, and technical assessments across frontend, backend, product, and AI work.",
    ogImagePath: "/assets/images/og/projects.jpg",
  },
  posts: {
    pathname: "/blog/",
    title: "Blog — Osmar Petry",
    description:
      "Notes and articles about software engineering, frontend architecture, accessibility, testing, systems thinking, and product-oriented development.",
    ogImagePath: "/assets/images/og/blog.jpg",
  },
  resume: {
    pathname: "/resume/",
    title: "Resume — Osmar Petry",
    description:
      "Resume and experience summary for Osmar Petry, a Luxembourgish Senior Software Engineer with 9+ years of experience building and scaling web and mobile products across EU and US distributed teams.",
    ogImagePath: "/assets/images/og/resume.jpg",
  },
  slides: {
    pathname: "/slides/",
    title: "Slides — Osmar Petry",
    description:
      "Presentation decks from talks, workshops, and university seminars given by Osmar Petry across frontend, DevOps, and software engineering topics.",
    ogImagePath: "/assets/images/og/home.jpg",
  },
  notFound: {
    pathname: "/404/",
    title: "404 — Osmar Petry",
    description: "The page you requested could not be found.",
    ogImagePath: "/assets/images/og/home.jpg",
  },
  getPostPathname(slug) {
    return `/blog/${slug}/`;
  },
  getPostOgImagePath(slug) {
    return `/assets/images/og/blog/${slug}.jpg`;
  },
};

module.exports = pageMetadata;
