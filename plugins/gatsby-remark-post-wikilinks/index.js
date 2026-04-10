const WIKILINK_PATTERN = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getNodeSlug = (node, getNode) => {
  if (!node) return null;

  if (node.fields?.slug) {
    return node.fields.slug;
  }

  const fileNode = node.parent ? getNode(node.parent) : null;
  return fileNode?.name || null;
};

const buildMissingLinkHtml = (label) => {
  const trimmedLabel = label.trim();
  const escapedLabel = escapeHtml(trimmedLabel);
  const missingMessage = "Page does not exist.";
  const missingLabel = escapeHtml(`${trimmedLabel}. ${missingMessage}`);

  return `<span class="post-inline-link--missing" aria-label="${missingLabel}" title="${missingMessage}" data-tooltip-message="${missingMessage}">${escapedLabel}</span>`;
};

const buildReplacementNodes = (textNode, validPostSlugs) => {
  const value = textNode.value;
  const replacements = [];
  let lastIndex = 0;

  WIKILINK_PATTERN.lastIndex = 0;

  for (let match = WIKILINK_PATTERN.exec(value); match; match = WIKILINK_PATTERN.exec(value)) {
    const [fullMatch, rawSlug, rawLabel] = match;
    const targetSlug = rawSlug.trim();
    const label = rawLabel.trim();

    if (match.index > lastIndex) {
      replacements.push({
        type: "text",
        value: value.slice(lastIndex, match.index),
      });
    }

    if (validPostSlugs.has(targetSlug)) {
      replacements.push({
        type: "link",
        url: `/posts/${targetSlug}/`,
        children: [
          {
            type: "text",
            value: label,
          },
        ],
      });
    } else {
      replacements.push({
        type: "html",
        value: buildMissingLinkHtml(label),
      });
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex === 0) {
    return [textNode];
  }

  if (lastIndex < value.length) {
    replacements.push({
      type: "text",
      value: value.slice(lastIndex),
    });
  }

  return replacements;
};

const transformNodeChildren = (node, validPostSlugs) => {
  if (!Array.isArray(node.children) || node.children.length === 0) {
    return;
  }

  const nextChildren = [];

  for (const child of node.children) {
    if (child.type === "text") {
      nextChildren.push(...buildReplacementNodes(child, validPostSlugs));
      continue;
    }

    if (!["code", "definition", "html", "inlineCode", "link"].includes(child.type)) {
      transformNodeChildren(child, validPostSlugs);
    }

    nextChildren.push(child);
  }

  node.children = nextChildren;
};

module.exports = ({ markdownAST, getNode, getNodesByType }) => {
  const validPostSlugs = new Set(
    getNodesByType("MarkdownRemark")
      .map((node) => getNodeSlug(node, getNode))
      .filter((slug) => slug && slug !== "resume")
  );

  transformNodeChildren(markdownAST, validPostSlugs);

  return markdownAST;
};
