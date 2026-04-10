const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("src/templates/post.jsx");

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          frontmatter {
            title
            date
            tags
            description
            layout
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.nodes.filter(
    (node) => node.fields.slug !== "resume"
  );

  posts.forEach((post) => {
    createPage({
      path: `/posts/${post.fields.slug}/`,
      component: postTemplate,
      context: {
        id: post.id,
        slug: post.fields.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const slug = fileNode.name;

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};
