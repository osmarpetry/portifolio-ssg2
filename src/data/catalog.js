import projects from "./projects";

const PROJECT_SLUGS_WITH_IMAGES = new Set([
  "jeff-next",
  "echo-coach-lingue",
  "portfolio-gatsby-v1",
  "portifolio-eleventry",
  "roast-my-landing",
  "portifolio-notion",
  "chargebee-brevo-sync",
  "citadel-character-atlas",
  "flowers-city",
  "my-accounts",
  "felippe",
  "speach-poc",
  "earth-1999",
  "animation-principles-explorer",
  "goodread",
  "moneylion-demo",
  "lumdb",
  "tokens-figma-node",
  "black-spotify",
  "weather-7",
  "bootstrap-resposive-site",
  "fotograf",
  "lumdb-nextjs",
  "spring-animations",
]);

function resolveImage(slug) {
  return {
    slug,
    src: `/assets/images/screenshots/projects/${slug}/cover.png`,
    alt: `Cover image for ${slug}.`,
  };
}

function deriveProject(project) {
  const githubLinks = project.links.filter((link) => /github\.com/i.test(link.url));
  const liveLinks = project.links.filter((link) => !/github\.com/i.test(link.url));
  const hasImage = PROJECT_SLUGS_WITH_IMAGES.has(project.slug);

  return {
    ...project,
    images: hasImage ? [resolveImage(project.slug)] : [],
    hasImage,
    githubLinks,
    liveLinks,
  };
}

const derivedProjects = projects.map(deriveProject);
const homePreviewProjectSlugs = [
  "echo-coach-lingue",
  "roast-my-landing",
  "chargebee-brevo-sync",
  "citadel-character-atlas",
];

const projectsByTier = { 1: [], 2: [], 3: [] };
const projectByRepoSlug = {};

for (const project of derivedProjects) {
  projectsByTier[project.tier].push(project);
  for (const repo of project.repos) {
    projectByRepoSlug[repo] = project;
  }
}

const homeTier1PreviewProjects = homePreviewProjectSlugs
  .map((slug) => derivedProjects.find((project) => project.slug === slug))
  .filter(Boolean);

const allProjectsWithImages = derivedProjects.filter((p) => p.hasImage);
const allProjectsWithoutImages = derivedProjects.filter((p) => !p.hasImage);

const catalog = {
  allReposCount: derivedProjects.reduce((total, p) => total + p.repos.length, 0),
  homeTier1PreviewProjects,
  projectByRepoSlug,
  projectsWithImagesOrdered: allProjectsWithImages,
  projectsWithoutImagesOrdered: allProjectsWithoutImages,
  projectsByTier,
  tier1Projects: projectsByTier[1],
  tier2Projects: projectsByTier[2],
  tier3Projects: projectsByTier[3],
};

export default catalog;
