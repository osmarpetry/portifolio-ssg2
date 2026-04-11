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
  slug: "nosql-mongodb-mean",
  title: "NoSQL, MongoDB e MEAN",
  url: "https://www.slideshare.net/slideshow/nosql-mongodb-e-mean/69650343",
  views: 291,
  slideCount: 0,
  thumbnail:
    "https://cdn.slidesharecdn.com/ss_thumbnails/nosqlmongodbmean-161129190639-thumbnail.jpg?width=640&height=640&fit=bounds",
  publishedDate: "2016-11",
  topics: ["NoSQL", "MongoDB", "MEAN Stack"],
};

const slideNoThumb = {
  slug: "react-query",
  title: "Biblioteca React-Query",
  url: "https://www.slideshare.net/slideshow/biblioteca-reactquery/242857821",
  views: 34,
  slideCount: 16,
  thumbnail: "",
  publishedDate: "2021-02",
  topics: ["React", "React-Query", "Frontend"],
};

const slideNoViews = {
  slug: "design-patterns",
  title: "Design Patterns",
  url: "https://www.slideshare.net/slideshow/design-patterns-242857815/242857815",
  views: 0,
  slideCount: 0,
  thumbnail:
    "https://cdn.slidesharecdn.com/ss_thumbnails/imagetopdf1-210216201357-thumbnail.jpg?width=640&height=640&fit=bounds",
  publishedDate: "2021-02",
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
