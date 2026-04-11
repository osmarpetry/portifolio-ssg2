import React from "react";
import SlideCard from "./SlideCard";

export default {
  title: "Components/SlideCard",
  component: SlideCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

const slideWithThumb = {
  slug: "nosql-mongodb-e-mean",
  title: "NoSQL, MongoDB, and MEAN",
  url: "https://www.slideshare.net/slideshow/nosql-mongodb-e-mean/69650343",
  pdfPath: "/assets/pdfs/slides/nosql-mongodb-e-mean.pdf",
  thumbnail: "/assets/images/slides/nosql-mongodb-e-mean.jpg",
  topics: ["NoSQL", "MongoDB", "MEAN"],
};

const slideNoThumb = {
  slug: "biblioteca-reactquery",
  title: "React Query Library",
  url: "https://www.slideshare.net/slideshow/biblioteca-reactquery/242857821",
  pdfPath: "/assets/pdfs/slides/biblioteca-reactquery.pdf",
  thumbnail: "",
  topics: ["React Query", "Frontend"],
};

const slideNoViews = {
  slug: "design-patterns-242857815",
  title: "Design Patterns",
  url: "https://www.slideshare.net/slideshow/design-patterns-242857815/242857815",
  pdfPath: "/assets/pdfs/slides/design-patterns-242857815.pdf",
  thumbnail: "/assets/images/slides/design-patterns-242857815.jpg",
  topics: ["Design Patterns", "Software Engineering"],
};

export const WithThumbnail = {
  args: { slide: slideWithThumb },
};

export const WithoutThumbnail = {
  args: { slide: slideNoThumb },
};

export const NoViews = {
  args: { slide: slideNoViews },
};
