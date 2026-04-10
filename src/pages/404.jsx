import React from "react";
import { Link, navigate } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const handleGoBack = () => {
  if (typeof window === "undefined") return;

  const referrer = document.referrer;

  if (referrer) {
    try {
      const previousUrl = new URL(referrer);

      if (
        previousUrl.origin === window.location.origin &&
        previousUrl.pathname !== window.location.pathname
      ) {
        window.location.assign(
          `${previousUrl.pathname}${previousUrl.search}${previousUrl.hash}`
        );
        return;
      }
    } catch {
      // Ignore malformed referrers and fall back to history/home navigation.
    }
  }

  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  navigate("/");
};

const NotFoundPage = () => (
  <Layout>
    <section className="section section-not-found">
      <div className="container">
        <div className="not-found-card">
          <p className="eyebrow">404</p>
          <h1 className="not-found-title">Page not found.</h1>
          <p className="not-found-description">
            The route you tried does not exist or is no longer available.
            Use one of the actions below to get back to the landing page or
            return to the previous screen.
          </p>
          <div className="not-found-actions">
            <Link className="action-link action-link--primary-page" to="/">
              Back to landing page
            </Link>
            <button
              className="action-link action-link--ghost-page"
              type="button"
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;

export const Head = () => (
  <Seo
    title="404 — Osmar Petry"
    description="The page you requested could not be found."
    pathname="/404/"
  />
);
