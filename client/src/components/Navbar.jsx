import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <div className="brand-logo">AI</div>
          <div className="brand-name">ResumeCraft</div>
        </Link>

        <nav className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/templates" className="nav-link">Templates</Link>
          <Link to="/editor" className="nav-link">Editor</Link>
          <Button asLink to="/editor">Start Building</Button>
        </nav>
      </div>
    </header>
  );
}
