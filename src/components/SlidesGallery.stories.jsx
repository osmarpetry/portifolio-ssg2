import React from "react";
import SlidesGallery from "./SlidesGallery";

export default {
  title: "Sections/SlidesGallery",
  component: SlidesGallery,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="container" style={{ padding: "2rem 0" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
