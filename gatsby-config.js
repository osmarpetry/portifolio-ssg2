/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: "Osmar Petry",
    shortName: "Osmar Petry",
    siteUrl: "https://osmarpetry.dev",
    description:
      "Senior Software Engineer with 9+ years building web and mobile products across EU and US distributed teams.",
    themeColor: "#6c5a9a",
    backgroundColor: "#f7f3ed",
    email: "osmarpetry@gmail.com",
    linkedin: "https://www.linkedin.com/in/osmarpetry",
    github: "https://github.com/osmarpetry",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/static/assets/images`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: require.resolve("./plugins/gatsby-remark-post-wikilinks"),
          },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: 100,
              className: "heading-anchor",
              maintainCase: false,
              removeAccents: true,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noreferrer",
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Osmar Petry",
        short_name: "Osmar Petry",
        start_url: "/",
        background_color: "#f7f3ed",
        theme_color: "#6c5a9a",
        display: "standalone",
        icon: "static/assets/icons/icon.svg",
      },
    },
  ],
};
