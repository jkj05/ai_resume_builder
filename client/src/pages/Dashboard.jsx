import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="page-title">Dashboard</h2>
      <p className="page-subtitle">
        Manage your resume, analyze ATS score, and prepare for interviews.
      </p>

      <div className="dashboard-grid">
        <div className="dash-card">
          <h3>Resume Editor</h3>
          <p>Edit, improve, and customize your resume.</p>
          <button
            className="btn-primary"
            onClick={() => navigate("/editor")}
          >
            Continue Editing
          </button>
        </div>

        <div className="dash-card">
          <h3>Templates</h3>
          <p>Switch between professional ATS-safe templates.</p>
          <button
            className="btn-ghost"
            onClick={() => navigate("/templates")}
          >
            View Templates
          </button>
        </div>

        <div className="dash-card">
          <h3>ATS Analyzer</h3>
          <p>Check how well your resume matches a job description.</p>
          <button
            className="btn-ghost"
            onClick={() => navigate("/ats")}
          >
            Analyze Resume
          </button>
        </div>

        <div className="dash-card">
          <h3>Mock Interview</h3>
          <p>Practice role-based interview questions.</p>
          <button
            className="btn-ghost"
            onClick={() => navigate("/interview")}
          >
            Start Interview
          </button>
        </div>

        <div className="dash-card">
          <h3>Download</h3>
          <p>Export your resume in ATS-friendly formats.</p>
          <button
            className="btn-ghost"
            onClick={() => navigate("/download")}
          >
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}
