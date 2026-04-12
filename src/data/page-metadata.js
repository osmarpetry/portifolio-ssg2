const pageMetadata = {
  home: {
    pathname: "/",
    title: "Osmar Petry",
    description:
      "Senior Software Engineer focused on frontend-heavy product work across React, Next.js, TypeScript, Node.js, performance, testing, and maintainable delivery.",
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
      "Resume and experience summary for Osmar Petry, covering senior software engineering work across EU and US distributed product teams.",
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
