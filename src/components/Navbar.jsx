import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "gatsby";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shellRef = useRef(null);
  const mobileNavMq = useRef(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    mobileNavMq.current = window.matchMedia("(max-width: 700px)");

    const handleEscape = (e) => {
      if (e.key === "Escape") close();
    };

    const handleOutsideClick = (e) => {
      if (!mobileNavMq.current?.matches) return;
      if (shellRef.current && !shellRef.current.contains(e.target)) close();
    };

    const handleResize = () => {
      if (!mobileNavMq.current?.matches) close();
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOutsideClick);

    if (typeof mobileNavMq.current.addEventListener === "function") {
      mobileNavMq.current.addEventListener("change", handleResize);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [close]);

  return (
    <nav
      ref={shellRef}
      className={`nav-shell${isOpen ? " is-open" : ""}`}
      aria-label="Primary"
    >
      <div className="container nav-inner">
        <Link className="nav-brand" to="/">
          Osmar Petry
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="nav-toggle__line" />
          <span className="nav-toggle__line" />
          <span className="nav-toggle__line" />
        </button>
        <div className="nav-links" id="primary-nav-links">
          <Link className="nav-link" to="/projects/" onClick={close}>
            Projects
          </Link>
          <Link className="nav-link" to="/resume/" onClick={close}>
            Resume
          </Link>
          <Link className="nav-link" to="/posts/" onClick={close}>
            Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
