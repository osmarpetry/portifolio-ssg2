import projects from "./projects";
import companies from "./companies";

function deriveProject(project) {
  const githubLinks = project.links.filter((link) => /github\.com/i.test(link.url));
  const liveLinks = project.links.filter((link) => !/github\.com/i.test(link.url));

  const imageCandidates = [
    `/assets/images/projects/${project.slug}/cover.jpg`,
    `/assets/images/projects/${project.slug}/cover.png`,
    `/assets/images/screenshots/projects/${project.slug}/cover.png`,
  ];

  return {
    ...project,
    type: `Tier ${project.tier}`,
    tierLabel: `Tier ${project.tier}`,
    images: imageCandidates.length
      ? [{ src: imageCandidates[0], alt: `Cover image for ${project.title}.` }]
      : [],
    hasImage: true,
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

const tierDescriptions = {
  1: {
    label: "Tier 1",
    shortLabel: "T1",
    title: "Strongest work",
    description:
      "The first projects someone should read to understand the strongest frontend, product, and implementation work in the portfolio.",
    meaning:
      "Lead selection. These projects best represent current quality, depth, and judgment.",
    path: "/projects/#tier-1",
    ctaLabel: "Open Tier 1",
  },
  2: {
    label: "Tier 2",
    shortLabel: "T2",
    title: "Context and range",
    description:
      "Solid supporting work that adds range, context, and breadth, but should be read after Tier 1.",
    meaning:
      "Supporting selection. Useful for range and context, but not the lead read.",
    path: "/projects/#tier-2",
    ctaLabel: "Open Tier 2",
  },
  3: {
    label: "Tier 3",
    shortLabel: "T3",
    title: "Archive",
    description:
      "Historical repos, experiments, and older work kept visible for completeness without carrying the main narrative.",
    meaning:
      "Archive. Visible on purpose, but not prioritized in the reading order.",
    path: "/projects/#tier-3",
    ctaLabel: "Open Tier 3",
  },
};

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
  tierDescriptions,
};

export default catalog;
