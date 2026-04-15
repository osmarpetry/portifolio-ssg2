import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import pageMetadata from "../data/page-metadata";
import {
  buildBreadcrumbJsonLd,
  buildPersonJsonLd,
  buildProfilePageJsonLd,
} from "../utils/structuredData";

const ResumePage = ({ data }) => {
  const resumeFile = data.markdownRemark;
  const html = resumeFile?.html || "<p>Resume content not found.</p>";

  return (
    <Layout>
      <section className="section section-markdown-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link className="breadcrumb__link" to="/">
              Home
            </Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">Resume</span>
          </nav>
          <div className="markdown-prose resume-prose">
            <a
              className="resume-pdf-btn"
              href="/assets/resume/resume-osmarpetry.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Download resume as PDF"
              title="Download PDF"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 1v10m0 0L4.5 7.5M8 11l3.5-3.5M2 13h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="resume-pdf-btn__label">Download resume</span>
            </a>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResumePage;

export const Head = () => (
  <Seo
    title={pageMetadata.resume.title}
    description={pageMetadata.resume.description}
    pathname={pageMetadata.resume.pathname}
    image={pageMetadata.resume.ogImagePath}
    imageAlt="Resume page preview image"
    jsonLd={[
      buildProfilePageJsonLd({
        name: "Osmar Petry Resume",
        description: pageMetadata.resume.description,
        pathname: pageMetadata.resume.pathname,
      }),
      buildPersonJsonLd(),
      buildBreadcrumbJsonLd([
        { name: "Home", pathname: "/" },
        { name: "Resume", pathname: pageMetadata.resume.pathname },
      ]),
    ]}
  />
);

export const query = graphql`
  query ResumeQuery {
    markdownRemark(fileAbsolutePath: { regex: "/content/resume.md$/" }) {
      html
    }
  }
`;
