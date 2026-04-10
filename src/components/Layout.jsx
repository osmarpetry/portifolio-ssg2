import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/site.css";

const Layout = ({ children }) => (
  <div id="top" className="site-wrapper">
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <header className="site-header">
      <Navbar />
    </header>
    <main id="main">{children}</main>
    <Footer />
  </div>
);

export default Layout;
