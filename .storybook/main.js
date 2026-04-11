const path = require("path");

/** @type {import('@storybook/react-webpack5').StorybookConfig} */
module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../static"],
  webpackFinal: async (config) => {
    // Add babel-loader rule for JSX in src/
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, "../src"),
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            ["@babel/preset-env", { targets: { browsers: ["last 2 versions"] } }],
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        },
      },
    });

    // Stub Gatsby modules
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      gatsby: path.resolve(__dirname, "./gatsby-stub.js"),
    };

    return config;
  },
};
