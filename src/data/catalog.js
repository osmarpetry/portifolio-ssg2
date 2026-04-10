import projects from "./projects";
import companies from "./companies";

const PROJECT_SLUGS_WITH_IMAGES = new Set([
  "chargebee-brevo-demo",
  "rick-et-morty",
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

const projectsByTier = { 1: [], 2: [], 3: [] };
const projectByRepoSlug = {};

for (const project of derivedProjects) {
  projectsByTier[project.tier].push(project);
  for (const repo of project.repos) {
    projectByRepoSlug[repo] = project;
  }
}

const companiesBySlug = {};
for (const company of companies) {
  companiesBySlug[company.slug] = company;
}

const homeTier1PreviewProjects = projectsByTier[1].slice(0, 4);

const homeCompanyHighlightOrder = ["attend", "consulting", "x-team", "luizalabs"];
const homeCompanyProjects = homeCompanyHighlightOrder
  .map((slug) => companiesBySlug[slug])
  .filter(Boolean)
  .map((company) => {
    const project = company.projects[0];
    if (!project) return null;
    return {
      ...project,
      type: company.name,
      links: [
        ...(project.links || []),
        { label: "All company work", url: `/companies/#company-${company.slug}` },
      ],
      companySlug: company.slug,
      companyName: company.name,
    };
  })
  .filter(Boolean);

const allProjectsWithImages = derivedProjects.filter((p) => p.hasImage);
const allProjectsWithoutImages = derivedProjects.filter((p) => !p.hasImage);

const catalog = {
  allReposCount: derivedProjects.reduce((total, p) => total + p.repos.length, 0),
  companiesBySlug,
  homeCompanyProjects,
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
