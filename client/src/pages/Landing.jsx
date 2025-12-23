import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="hero">
      <div className="hero-inner">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="hero-copy">
          <h1 className="hero-title">
            Build ATS-Proof Resumes <br /> with AI Assistance
          </h1>

          <p className="hero-sub">
            Create professional resumes, optimize for ATS, generate impactful
            bullet points, and prepare for interviews — all in one clean,
            minimalist workspace.
          </p>

          <div className="hero-ctas">
            <Link to="/editor" className="btn btn-primary">
              Build My Resume
            </Link>
            <Link to="/dashboard" className="btn btn-ghost">
              Go to Dashboard
            </Link>
          </div>

          {/* FEATURE HIGHLIGHTS */}
          <div className="features">
            <div className="feature">
              <strong>AI Resume Writer</strong>
              <span>Generate summaries & bullet points instantly</span>
            </div>

            <div className="feature">
              <strong>ATS Analyzer</strong>
              <span>Match your resume to job descriptions</span>
            </div>

            <div className="feature">
              <strong>Interview Prep</strong>
              <span>Practice role-specific questions</span>
            </div>
          </div>
        </div>

        {/* RIGHT: RESUME PREVIEW CARD */}
        <div className="hero-preview">
          <div className="card-preview">
            <div className="pv-header">
              <div>
                <div className="pv-name">Jane Doe</div>
                <div className="pv-title">Frontend Engineer</div>
              </div>
            </div>

            <div className="pv-section">
              <div className="pv-heading">Summary</div>
              <div className="pv-text">
                Frontend engineer with experience building responsive React
                applications, improving performance, and collaborating with
                cross-functional teams.
              </div>
            </div>

            <div className="pv-section">
              <div className="pv-heading">Experience</div>
              <div className="pv-text">
                • Built reusable UI components used across multiple projects
              </div>
              <div className="pv-text">
                • Improved page load times and accessibility
              </div>
            </div>

            <div className="pv-footer">
              Skills: React · JavaScript · CSS · UI Design
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
