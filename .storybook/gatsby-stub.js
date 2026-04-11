const React = require("react");

const Link = React.forwardRef(({ to, children, ...rest }, ref) =>
  React.createElement("a", { ...rest, href: to, ref }, children)
);
Link.displayName = "Link";

module.exports = {
  Link,
  graphql: () => null,
  useStaticQuery: () => ({}),
  StaticImage: (props) =>
    React.createElement("img", { src: props.src || "", alt: props.alt || "" }),
};
