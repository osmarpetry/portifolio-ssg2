const siteConfig = require("./site-config");

const netlifyContext = process.env.CONTEXT || process.env.NODE_ENV || "development";
const enableBundleAnalyze = process.env.ANALYZE_BUNDLE === "true";

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: siteConfig.title,
    shortName: siteConfig.shortName,
    alternateName: siteConfig.alternateName,
    siteUrl: siteConfig.url,
    site_url: siteConfig.url,
    description: siteConfig.description,
    themeColor: siteConfig.themeColor,
    backgroundColor: siteConfig.backgroundColor,
    email: siteConfig.email,
    linkedin: siteConfig.linkedin,
    github: siteConfig.github,
    language: siteConfig.language,
    locale: siteConfig.locale,
    rssPath: siteConfig.rssPath,
    defaultSocialImagePath: siteConfig.defaultSocialImagePath,
    socialImageWidth: siteConfig.socialImageWidth,
    socialImageHeight: siteConfig.socialImageHeight,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [siteConfig.googleAnalyticsTrackingId],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
          exclude: ["/404/", "/404.html", "/dev-404-page/**"],
          delayOnRouteUpdate: 0,
        },
      },
    },
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
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteConfig.title,
        short_name: siteConfig.shortName,
        start_url: "/",
        background_color: siteConfig.backgroundColor,
        theme_color: siteConfig.themeColor,
        display: "standalone",
        icon: "static/assets/icons/icon.svg",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/",
        excludes: ["/404", "/404.html", "/dev-404-page"],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark(filter: { fields: { slug: { ne: "resume" } } }) {
              nodes {
                fields {
                  slug
                }
                frontmatter {
                  date
                }
              }
            }
          }
        `,
        resolvePages: ({ allSitePage, allMarkdownRemark }) => {
          const postByPath = new Map(
            allMarkdownRemark.nodes.map((node) => [
              `/blog/${node.fields.slug}/`,
              node.frontmatter.date,
            ])
          );

          return allSitePage.nodes.map((page) => ({
            ...page,
            lastmod: postByPath.get(page.path),
          }));
        },
        serialize: ({ path, lastmod }) => ({
          url: path,
          lastmod: lastmod || undefined,
        }),
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteConfig.url,
        sitemap: `${siteConfig.url}/sitemap-index.xml`,
        resolveEnv: () => netlifyContext,
        env: {
          production: {
            policy: [{ userAgent: "*", allow: "/" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                language
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map((node) => ({
                title: node.frontmatter.title,
                description: node.frontmatter.description || node.excerpt,
                date: node.frontmatter.date,
                url: `${site.siteMetadata.siteUrl}/blog/${node.fields.slug}/`,
                guid: `${site.siteMetadata.siteUrl}/blog/${node.fields.slug}/`,
                custom_elements: [{ "content:encoded": node.html }],
              })),
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC } }
                  filter: { fields: { slug: { ne: "resume" } } }
                ) {
                  nodes {
                    excerpt(pruneLength: 220)
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      description
                    }
                  }
                }
              }
            `,
            output: siteConfig.rssPath,
            title: `${siteConfig.title} RSS Feed`,
            language: siteConfig.language,
          },
        ],
      },
    },

    ...(enableBundleAnalyze
      ? [
          {
            resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
            options: {
              analyzerMode: "static",
              openAnalyzer: false,
              reportFilename: "bundle-report.html",
              generateStatsFile: true,
              statsFilename: "bundle-stats.json",
            },
          },
        ]
      : []),
  ],
};
