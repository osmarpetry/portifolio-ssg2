const companies = [
  {
    slug: "cyber",
    name: "Cyberr",
    role: "Senior Software Engineer",
    period: "Oct 2025\u2013Present",
    summary:
      "Cybersecurity hiring platform focused on matching companies with verified security talent through recruiting, scheduling, and identity-aware product flows.",
    companyUrl: "https://cyberr.ai/",
    brand: {
      kind: "logo",
      text: "Cyberr",
      src: "/assets/images/company-logos/cyber.png",
      alt: "Cyberr logo",
    },
    projects: [
      {
        slug: "cyberr-ai-platform",
        title: "Cyberr hiring and scheduling platform",
        summary:
          "Frontend-focused full-stack delivery across calendar scheduling, dashboard widgets, Microsoft Graph and Daily.co integrations, and Veriff-based identity verification for the Cyberr platform.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Cyberr AI platform work.",
        },
        links: [{ label: "Cyberr", url: "https://cyberr.ai/" }],
      },
    ],
  },
  {
    slug: "attend",
    name: "Attend",
    role: "Senior Software Engineer",
    period: "May 2023\u2013Oct 2025",
    summary:
      "Ticketing and live-event commerce platform spanning passes, memberships, gift cards, and flexible fan experiences for sports and entertainment organizations.",
    companyUrl: "https://www.attend.tech",
    brand: {
      kind: "logo",
      text: "Attend",
      src: "/assets/images/company-logos/attend-dark.png",
      alt: "Attend logo",
    },
    projects: [
      {
        slug: "attend-operations-dashboard",
        title: "Operations dashboard for Pass, Flow, and Flex",
        summary:
          "Internal operations dashboard for inventory, assignments, and workflow coordination across Attend\u2019s ticketing products, built to reduce manual support work and improve team throughput.",
        image: {
          src: "/assets/images/screenshots/companies/attend/attend-operations-dashboard/cover.png",
          alt: "Editorial cover artwork for the private Attend operations dashboard.",
        },
      },
      {
        slug: "attend-flex-gift-card",
        title: "Flex gift card checkout",
        summary:
          "Gift-card purchase flow for Attend Flex, supporting partner-branded checkout and transaction-critical frontend behavior.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Attend Flex gift card flow.",
        },
        links: [{ label: "Gift card", url: "https://flex2.seasonshare.com/baa_dallas/gift" }],
      },
      {
        slug: "attend-flex-payments",
        title: "Flex plan configuration and payments",
        summary:
          "Configurable Flex product surface for building ticket bundles and experiences, including payment flows and partner-specific product configuration.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Attend Flex app work.",
        },
        links: [
          { label: "Flex app", url: "https://flex2.seasonshare.com/flex_sandbox_united_flex" },
        ],
      },
    ],
  },
  {
    slug: "consulting",
    name: "Consulting",
    role: "Senior Software Engineer",
    period: "Feb 2023\u2013Aug 2023",
    summary:
      "Independent product consulting across mobile health and white-label city and event apps, with reusable architecture and maintainable delivery patterns.",
    companyUrl: "",
    brand: { kind: "wordmark", text: "Consulting" },
    projects: [
      {
        slug: "consulting-health-app",
        title: "React Native health platform",
        summary:
          "React Native application that centralized patient health data, integrated third-party lab results, and supported patient-doctor communication.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for consulting health app work.",
        },
        links: [{ label: "Case note", url: "#" }],
      },
      {
        slug: "consulting-tourism-white-label",
        title: "White-label city and event apps",
        summary:
          "Reusable mobile architecture adapted across city and event apps, improving branding flexibility, delivery speed, and handoff to junior maintainers.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for consulting tourism apps work.",
        },
        links: [{ label: "Case note", url: "#" }],
      },
    ],
  },
  {
    slug: "x-team",
    name: "X-Team",
    role: "Senior Software Engineer",
    period: "Mar 2021\u2013Feb 2023",
    summary:
      "On-demand engineering company placing senior developers on product teams across client work in media, internal tooling, gaming, and digital fitness.",
    companyUrl: "https://x-team.com",
    brand: {
      kind: "logo",
      text: "X-Team",
      src: "/assets/images/company-logos/x-team.svg",
      alt: "X-Team logo",
    },
    projects: [
      {
        slug: "xteam-beachbody-bodi",
        title: "BODi workouts discovery",
        summary:
          "Workout discovery and filtering improvements on Beachbody On Demand, including the workouts filter experience I helped build and related GraphQL-powered frontend behavior.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Beachbody work.",
        },
        links: [
          { label: "Workout filters", url: "https://www.beachbodyondemand.com/workouts?locale=en_US" },
        ],
      },
      {
        slug: "xteam-lemonlight",
        title: "Lemonlight studio operations",
        summary:
          "Administrative tooling improvements, auto-table generation, bug fixes, and CI/CD stabilization for a video production platform.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Lemonlight work.",
        },
        links: [{ label: "Lemonlight", url: "https://www.lemonlight.com" }],
      },
      {
        slug: "xteam-kmf-xhq",
        title: "XHQ invoicing and operations portal",
        summary:
          "Back-office invoicing and internal portal improvements spanning APIs, Firebase, operations workflows, and staff tooling for X-Team\u2019s internal systems.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for KMF and XHQ work.",
        },
        links: [{ label: "XHQ", url: "https://xhq.x-team.com/login" }],
      },
      {
        slug: "xteam-xgames",
        title: "X-Games browser game and audio CLI",
        summary:
          "Browser-based game work plus CLI audio tooling and backup routines delivered as part of internal X-Team engagement initiatives.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for X-Games work.",
        },
        links: [{ label: "X-Team", url: "https://x-team.com" }],
      },
    ],
  },
  {
    slug: "luizalabs",
    name: "Luizalabs",
    role: "Frontend Software Engineer",
    period: "Dec 2020\u2013Mar 2021",
    summary:
      "Technology and innovation arm of Magalu focused on marketplace and retail product engineering at Brazilian scale.",
    companyUrl: "https://www.magazineluiza.com.br",
    brand: {
      kind: "logo",
      text: "Luizalabs",
      src: "/assets/images/company-logos/luizalabs.svg",
      alt: "Magazine Luiza wordmark used for Luizalabs",
    },
    projects: [
      {
        slug: "luizalabs-marketplace-placeholder",
        title: "Marketplace micro frontend foundations",
        summary:
          "Micro frontend architecture, shared component work, and React enablement material built to improve UI consistency and delivery speed across marketplace surfaces.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Luizalabs work.",
        },
        links: [{ label: "Magalu", url: "https://www.magazineluiza.com.br" }],
      },
    ],
  },
  {
    slug: "zup",
    name: "Zup",
    role: "Frontend Software Engineer",
    period: "Aug 2019\u2013Dec 2020",
    summary:
      "Brazilian technology company building digital products and platform work for large enterprises through consulting and product engineering teams, with some client engagements kept confidential.",
    companyUrl: "https://www.zup.com.br",
    brand: {
      kind: "logo",
      text: "Zup",
      src: "/assets/images/company-logos/zup.png",
      alt: "Zup icon",
    },
    projects: [
      {
        slug: "zup-placeholder",
        title: "Confidential fleet telemetry platform",
        summary:
          "Telemetry dashboards and real-time logistics visualizations delivered through Zup for a confidential truck-platform client, combining D3.js frontend work, backend integrations, and performance improvements.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Abstract portfolio-safe cover artwork for Zup client work.",
        },
        links: [{ label: "Zup", url: "https://www.zup.com.br" }],
      },
    ],
  },
  {
    slug: "ng-informatica",
    name: "NG Informatica",
    role: "Frontend Software Engineer",
    period: "Sep 2018\u2013Aug 2019",
    summary:
      "TOTVS software partner focused on enterprise management solutions across maintenance, fleet, facilities, occupational health, and environmental workflows.",
    companyUrl: "https://www.ngi.com.br/",
    brand: {
      kind: "logo",
      text: "NG Informatica",
      src: "/assets/images/company-logos/ng-informatica.png",
      alt: "NG Informatica logo",
    },
    projects: [
      {
        slug: "ng-informatica-placeholder",
        title: "Enterprise maintenance and operations frontend",
        summary:
          "React and GraphQL product work for enterprise management software, including frontend modernization, Cypress-based BDD, and testing improvements.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for NG Informatica work.",
        },
        links: [{ label: "NG Informatica", url: "https://www.ngi.com.br/" }],
      },
    ],
  },
  {
    slug: "coblue",
    name: "CoBlue OKR",
    role: "Frontend Software Engineer",
    period: "Jun 2018\u2013Dec 2018",
    summary:
      "Performance-management software company centered on OKR-driven strategy execution, goals, and continuous team feedback.",
    companyUrl: "https://coblue.com.br/",
    brand: {
      kind: "logo",
      text: "CoBlue",
      src: "/assets/images/company-logos/coblue.png",
      alt: "CoBlue icon",
    },
    projects: [
      {
        slug: "coblue-placeholder",
        title: "OKR platform re-architecture",
        summary:
          "Performance and scalability improvements on the main OKR product, including a Vue-to-React migration for critical product surfaces.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for CoBlue work.",
        },
        links: [{ label: "CoBlue", url: "https://coblue.com.br/" }],
      },
    ],
  },
  {
    slug: "totvs",
    name: "TOTVS",
    role: "Software Developer",
    period: "Feb 2017\u2013Oct 2017",
    summary:
      "Latin American enterprise software company building ERP, HR, workflow, and business platform products at large scale.",
    companyUrl: "https://www.totvs.com",
    brand: {
      kind: "logo",
      text: "TOTVS",
      src: "/assets/images/company-logos/totvs.png",
      alt: "TOTVS icon",
    },
    projects: [
      {
        slug: "totvs-placeholder",
        title: "THF component library and tooling",
        summary:
          "Early design-system and developer-experience work, including Angular and TypeScript components for THF (later PO UI) and a VSCode snippets extension.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for TOTVS work.",
        },
        links: [{ label: "TOTVS", url: "https://www.totvs.com" }],
      },
    ],
  },
  {
    slug: "envolve-labs",
    name: "Envolve Labs",
    role: "Full-Stack Developer",
    period: "Nov 2017\u2013Jun 2018",
    summary:
      "Joinville software studio building websites, mobile apps, and custom digital products for Brazilian clients, including engagements that remain client-confidential in the portfolio.",
    companyUrl: "https://envolvelabs.com/",
    brand: {
      kind: "logo",
      text: "Envolve Labs",
      src: "/assets/images/company-logos/envolve-labs.png",
      alt: "Envolve Labs logo",
    },
    projects: [
      {
        slug: "envolve-labs-placeholder",
        title: "Confidential refrigerated logistics suite",
        summary:
          "Web and mobile monitoring product delivered through Envolve Labs for a confidential logistics client, built across Angular, Ionic, and Firebase with a maintainable handoff structure.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Abstract portfolio-safe cover artwork for Envolve Labs client work.",
        },
        links: [{ label: "Envolve Labs", url: "https://envolvelabs.com/" }],
      },
    ],
  },
  {
    slug: "catolica",
    name: "Catolica SC",
    role: "Software Research Assistant",
    period: "Aug 2015\u2013Aug 2017",
    summary:
      "Higher-education institution in Santa Catarina with undergraduate programs, applied projects, and academic research activity.",
    companyUrl: "https://www.catolicasc.org.br/",
    brand: {
      kind: "logo",
      text: "Catolica SC",
      src: "/assets/images/company-logos/catolica.png",
      alt: "Catolica SC icon",
    },
    projects: [
      {
        slug: "catolica-research-placeholder",
        title: "BPMN 2.0 research tooling",
        summary:
          "Academic research work with Camunda, Java, and AngularJS for BPMN 2.0 process modeling, plus internal presentations on Git, Arduino, and LaTeX.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Catolica research work.",
        },
        links: [{ label: "Catolica SC", url: "https://www.catolicasc.org.br/" }],
      },
    ],
  },
];

export default companies;
