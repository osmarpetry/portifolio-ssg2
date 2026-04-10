import React from "react";
import siteData from "../data/site";

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-inner">
      <p>Osmar Petry</p>
      <p>&copy; {siteData.currentYear}</p>
      <a href="#top">Back to top</a>
    </div>
  </footer>
);

export default Footer;
