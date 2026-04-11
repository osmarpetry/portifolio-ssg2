/**
 * SlideShare presentations by Osmar Petry.
 * Built from `slides-export.json`, newest first.
 *
 * @typedef {Object} Slide
 * @property {string} slug - URL-safe identifier
 * @property {string} title - Presentation title
 * @property {string} description - Short presentation summary
 * @property {string} url - Full SlideShare URL
 * @property {string} downloadUrl - Original SlideShare download URL
 * @property {string} pdfPath - Local PDF download path
 * @property {string} thumbnail - Local thumbnail image path
 * @property {string[]} topics - Topic tags
 */

const slidesExport = require("./slides-export.json");

const PROFILE_URL = `https://www.slideshare.net/${
  slidesExport.account_registration?.login || "OsmarPetry"
}`;

const TOPICS_BY_SLUG = {
  "seminrio-asp-net-core-angular-2-e-typescript-com-scaffolding-yeoman": [
    "ASP.NET Core",
    "Angular",
    "TypeScript",
  ],
  "seminrio-java-microservices": ["Java", "Microservices"],
  "cobit-5-seminrio": ["COBIT", "IT Governance"],
  "nosql-mongodb-e-mean": ["NoSQL", "MongoDB", "MEAN"],
  "integrao-contnua-com-maven-e-jenkins": ["Maven", "Jenkins", "CI/CD"],
  "process-mining-process-discovery-and-prediction": [
    "Process Mining",
    "BPM",
    "ERP",
  ],
  "ferramenta-ghost-cms": ["Ghost", "CMS", "Node.js"],
  "raspberry-pi-102446689": ["Raspberry Pi", "IoT", "Automation"],
  "gesto-de-conhecimento-126404245": [
    "Knowledge Management",
    "Information Systems",
  ],
  "gerenciamento-de-continuidade-e-disponibilidade-na-itil-v3-2011-verso-atual": [
    "ITIL",
    "Service Management",
  ],
  "matemtica-computacional-clculo-de-reas-usando-integrais": [
    "Mathematics",
    "Integrals",
  ],
  "probabilidade-e-estatstica-regresso-linear-quadrtica-e-exponencial": [
    "Statistics",
    "Regression",
    "R",
  ],
  "matemtica-discreta-cdigo-de-hamming": ["Discrete Math", "Hamming Code"],
  "aulo-iniciante-de-programao-funcional": [
    "Functional Programming",
    "Workshop",
  ],
  "aulo-iniciante-de-clojure-rest": ["Clojure", "REST"],
  "aulo-iniciante-de-programao-com-clojure": [
    "Clojure",
    "Functional Programming",
  ],
  "design-patterns-242857815": ["Design Patterns", "Software Engineering"],
  "design-tokens": ["Design Tokens", "Frontend"],
  "flutter-242857817": ["Flutter", "Frontend"],
  "observables-rxjs": ["RxJS", "Frontend"],
  "imagetopdf-5-242857819": ["React", "Frontend"],
  "publicar-pacote-npm-na-zup": ["NPM", "Frontend", "Zup"],
  "biblioteca-reactquery": ["React Query", "Frontend"],
  "testes-em-integrao-contnua": ["Testing", "CI/CD"],
};

const slugFromUrl = (rawUrl) => {
  const parts = new URL(rawUrl).pathname.split("/").filter(Boolean);
  return parts[parts.length - 2] || parts[parts.length - 1];
};

const cleanDescription = (value) => value.replace(/\r\n/g, "\n").trim();

const slides = (slidesExport.slideshows_uploaded || [])
  .slice()
  .reverse()
  .map((slide) => {
    const slug = slugFromUrl(slide.url);

    return {
      slug,
      title: slide.title.trim(),
      description: cleanDescription(slide.description || ""),
      url: slide.url.trim(),
      downloadUrl: slide.download_url?.trim() || "",
      pdfPath: `/assets/pdfs/slides/${slug}.pdf`,
      thumbnail: `/assets/images/slides/${slug}.jpg`,
      topics: TOPICS_BY_SLUG[slug] || [],
    };
  });

const featuredSlides = slides.slice(0, 3);

module.exports = { slides, featuredSlides, PROFILE_URL };
