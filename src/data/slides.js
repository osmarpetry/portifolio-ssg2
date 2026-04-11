/**
 * SlideShare presentations by Osmar Petry.
 * Sorted by views descending (most popular first).
 *
 * @typedef {Object} Slide
 * @property {string} slug - URL-safe identifier
 * @property {string} title - Presentation title
 * @property {string} url - Full SlideShare URL
 * @property {number} views - Approximate view count
 * @property {number} slideCount - Number of slides
 * @property {string} thumbnail - CDN thumbnail URL
 * @property {string} publishedDate - Approximate publish date (YYYY-MM)
 * @property {string[]} topics - Topic tags
 */

const slides = [
  {
    slug: "itil-continuidade-disponibilidade",
    title: "Gerenciamento de continuidade e disponibilidade na ITIL v3 2011",
    url: "https://www.slideshare.net/slideshow/gerenciamento-de-continuidade-e-disponibilidade-na-itil-v3-2011-verso-atual/126404311",
    views: 356,
    slideCount: 0,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/gerenciamentodecontinuidadeedisponibilidadenaitilv32011versaoatual-181221011731-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2018-12",
    topics: ["ITIL", "IT Governance"],
  },
  {
    slug: "nosql-mongodb-mean",
    title: "NoSQL, MongoDB e MEAN",
    url: "https://www.slideshare.net/slideshow/nosql-mongodb-e-mean/69650343",
    views: 291,
    slideCount: 0,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/nosqlmongodbmean-161129190639-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2016-11",
    topics: ["NoSQL", "MongoDB", "MEAN Stack"],
  },
  {
    slug: "introducao-react",
    title: "Introdução ao React",
    url: "https://pt.slideshare.net/slideshow/imagetopdf-5-242857819/242857819?utm_source=clipboard_share_button&utm_campaign=slideshare_make_sharing_viral_v2&utm_variation=control&utm_medium=share",
    views: 36,
    slideCount: 8,
    thumbnail: "",
    publishedDate: "2021-02",
    topics: ["React", "Frontend"],
  },
  {
    slug: "testes-integracao-continua",
    title: "Testes em integração contínua",
    url: "https://www.slideshare.net/OsmarPetry/testes-em-integracao-continua",
    views: 34,
    slideCount: 13,
    thumbnail: "",
    publishedDate: "2021-02",
    topics: ["Testing", "CI/CD"],
  },
  {
    slug: "react-query",
    title: "Biblioteca React-Query",
    url: "https://www.slideshare.net/slideshow/biblioteca-reactquery/242857821",
    views: 34,
    slideCount: 16,
    thumbnail: "",
    publishedDate: "2021-02",
    topics: ["React", "React-Query", "Frontend"],
  },
  {
    slug: "flutter",
    title: "Flutter",
    url: "https://www.slideshare.net/slideshow/flutter-242857817/242857817",
    views: 26,
    slideCount: 11,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/imagetopdf3-210216201358-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2021-02",
    topics: ["Flutter", "Mobile"],
  },
  {
    slug: "observables-rxjs",
    title: "Observables RXJS",
    url: "https://www.slideshare.net/slideshow/observables-rxjs/242857818",
    views: 18,
    slideCount: 10,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/imagetopdf4-210216201358-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2021-02",
    topics: ["RxJS", "Frontend"],
  },
  {
    slug: "publicar-pacote-npm",
    title: "Publicar pacote NPM na Zup",
    url: "https://www.slideshare.net/slideshow/publicar-pacote-npm-na-zup/242857820",
    views: 13,
    slideCount: 20,
    thumbnail: "",
    publishedDate: "2021-02",
    topics: ["NPM", "DevOps"],
  },
  {
    slug: "design-patterns",
    title: "Design Patterns",
    url: "https://www.slideshare.net/slideshow/design-patterns-242857815/242857815",
    views: 0,
    slideCount: 0,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/imagetopdf1-210216201357-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2021-02",
    topics: ["Design Patterns", "Software Engineering"],
  },
  {
    slug: "asp-net-angular-typescript",
    title: "ASP .NET CORE, Angular 2, e Typescript com Scaffolding Yeoman",
    url: "https://www.slideshare.net/slideshow/seminrio-asp-net-core-angular-2-e-typescript-com-scaffolding-yeoman/68075910",
    views: 0,
    slideCount: 0,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/seminarioangularasp-161102184341-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2016-11",
    topics: ["ASP.NET", "Angular", "TypeScript"],
  },
  {
    slug: "integracao-continua-maven-jenkins",
    title: "Integração contínua com Maven e Jenkins",
    url: "https://www.slideshare.net/slideshow/integrao-contnua-com-maven-e-jenkins/80814826",
    views: 0,
    slideCount: 0,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/integraocontnuacommavenejenkins-171014205106-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2017-10",
    topics: ["Maven", "Jenkins", "CI/CD"],
  },
  {
    slug: "ghost-cms",
    title: "Ferramenta Ghost CMS",
    url: "https://www.slideshare.net/OsmarPetry/ferramenta-ghost-cms",
    views: 0,
    slideCount: 0,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/ferramenta-ghost-180318120703-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2018-03",
    topics: ["Ghost", "CMS"],
  },
  {
    slug: "cobit-5",
    title: "Cobit 5",
    url: "https://www.slideshare.net/slideshow/cobit-5-seminrio/69650163",
    views: 0,
    slideCount: 0,
    thumbnail:
      "https://cdn.slidesharecdn.com/ss_thumbnails/cobit5-161129190046-thumbnail.jpg?width=640&height=640&fit=bounds",
    publishedDate: "2016-11",
    topics: ["COBIT", "IT Governance"],
  },
];

const PROFILE_URL = "https://www.slideshare.net/OsmarPetry";

const featuredSlides = slides.slice(0, 3);

module.exports = { slides, featuredSlides, PROFILE_URL };
