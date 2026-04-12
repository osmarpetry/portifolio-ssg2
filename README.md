# Osmar Petry Portfolio

Source code for [osmarpetry.dev](https://osmarpetry.dev).

Personal portfolio, resume, slides, and blog. Built with Gatsby 5 and React 18, with Markdown-driven content and static output.

## Stack

- Gatsby 5
- React 18
- Markdown for posts and resume
- Netlify deploys
- Storybook for component work
- Playwright for e2e tests

## Routes architecture

Nothing fancy:

- `src/pages/*.jsx` holds top-level routes like `/`, `/projects`, `/resume`, `/slides`, and `/blog`
- `content/posts/*.md` holds blog content
- `gatsby-node.js` reads post slugs from Markdown and creates `/blog/:slug/`
- `src/templates/post.jsx` renders each blog post page
- `content/resume.md` feeds resume page content
- `src/components` holds shared UI
- `src/data` holds site data and metadata used across pages

## Local development

Node `24.x`.

```bash
npm install
npm run dev
```

Build production version:

```bash
npm run build
npm run serve
```
