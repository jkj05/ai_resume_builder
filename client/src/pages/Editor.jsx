import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../utils/api";

export default function Editor() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');

  const [resume, setResume] = useState({
    name: "Jane Doe",
    title: "Frontend Engineer",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    location: "",
    summary: "",
    skills: "",
    experiences: [
      {
        company: "",
        role: "",
        duration: "",
        bullets: [""],
      },
    ],
    education: [
      {
        school: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: "",
      },
    ],
    projects: [
      {
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
        expiryDate: "",
      },
    ],
  });

  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    summary: false,
    bullets: {},
    improving: {},
    star: {},
  });

  // Error state
  const [error, setError] = useState(null);

  // Load saved resume from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        const resumeData = JSON.parse(saved);
        // Convert resumeData back to editor format
        setResume({
          name: resumeData.personalInfo?.name || "",
          title: resumeData.personalInfo?.title || "",
          email: "",
          phone: "",
          linkedin: "",
          portfolio: "",
          location: "",
          summary: resumeData.summary || "",
          skills: resumeData.skills?.join(', ') || "",
          experiences: resumeData.experience?.map(exp => ({
            company: exp.company || "",
            role: exp.position || "",
            duration: exp.duration || "",
            bullets: exp.bullets?.length > 0 ? exp.bullets : [""],
          })) || [{
            company: "",
            role: "",
            duration: "",
            bullets: [""],
          }],
          education: [{
            school: "",
            degree: "",
            field: "",
            graduationDate: "",
            gpa: "",
          }],
          projects: [{
            name: "",
            description: "",
            technologies: "",
            link: "",
          }],
          certifications: [{
            name: "",
            issuer: "",
            date: "",
            expiryDate: "",
          }],
        });
      }
    } catch (err) {
      console.error('Failed to load saved resume:', err);
    }
  }, []);

  /* ------------------ Helpers ------------------ */
  const updateField = (field, value) => {
    setResume({ ...resume, [field]: value });
  };

  const updateExperience = (i, field, value) => {
    const exps = [...resume.experiences];
    exps[i][field] = value;
    setResume({ ...resume, experiences: exps });
  };

  const updateBullet = (ei, bi, value) => {
    const exps = [...resume.experiences];
    exps[ei].bullets[bi] = value;
    setResume({ ...resume, experiences: exps });
  };

  const addBullet = (ei) => {
    const exps = [...resume.experiences];
    exps[ei].bullets.push("");
    setResume({ ...resume, experiences: exps });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experiences: [
        ...resume.experiences,
        { company: "", role: "", duration: "", bullets: [""] },
      ],
    });
  };

  /* ------------------ AI Functions ------------------ */
  const generateSummary = async () => {
    setLoadingStates({ ...loadingStates, summary: true });
    setError(null);

    try {
      const response = await api.generateSummary({
        fullName: resume.name,
        title: resume.title,
        skills: resume.skills.split(',').map(s => s.trim()).filter(Boolean),
        tone: 'professional',
      });

      updateField("summary", response.summary);
    } catch (err) {
      setError(`Failed to generate summary: ${err.message}`);
    } finally {
      setLoadingStates({ ...loadingStates, summary: false });
    }
  };

  const generateBulletsForExp = async (expIndex) => {
    const exp = resume.experiences[expIndex];

    if (!exp.role || !exp.company) {
      setError("Please fill in role and company first");
      return;
    }

    setLoadingStates({
      ...loadingStates,
      bullets: { ...loadingStates.bullets, [expIndex]: true },
    });
    setError(null);

    try {
      const response = await api.generateBullets({
        jobTitle: exp.role,
        company: exp.company,
        responsibilities: exp.bullets.filter(b => b.trim()).join('. ') || 'General responsibilities',
        tone: 'professional',
      });

      const exps = [...resume.experiences];
      exps[expIndex].bullets = response.bullets;
      setResume({ ...resume, experiences: exps });
    } catch (err) {
      setError(`Failed to generate bullets: ${err.message}`);
    } finally {
      setLoadingStates({
        ...loadingStates,
        bullets: { ...loadingStates.bullets, [expIndex]: false },
      });
    }
  };

  const convertToSTAR = async (expIndex) => {
    const exp = resume.experiences[expIndex];

    setLoadingStates({
      ...loadingStates,
      star: { ...loadingStates.star, [expIndex]: true },
    });
    setError(null);

    try {
      const response = await api.convertToStar({
        experience: `${exp.role} at ${exp.company}`,
        bullets: exp.bullets.filter(b => b.trim()),
      });

      const exps = [...resume.experiences];
      exps[expIndex].bullets = response.starBullets;
      setResume({ ...resume, experiences: exps });
    } catch (err) {
      setError(`Failed to convert to STAR format: ${err.message}`);
    } finally {
      setLoadingStates({
        ...loadingStates,
        star: { ...loadingStates.star, [expIndex]: false },
      });
    }
  };

  /* ------------------ Progress ------------------ */
  const progress = useMemo(() => {
    let score = 0;
    if (resume.name) score += 15;
    if (resume.title) score += 15;
    if (resume.summary) score += 20;
    if (resume.skills) score += 20;
    if (resume.experiences.some((e) => e.company && e.role)) score += 30;
    return Math.min(score, 100);
  }, [resume]);

  /* ------------------ Persist to localStorage ------------------ */
  useEffect(() => {
    // Save resume data to localStorage for use in ATS and other pages
    try {
      const resumeDataForATS = {
        personalInfo: {
          name: resume.name,
          title: resume.title,
        },
        summary: resume.summary,
        skills: resume.skills.split(',').map(s => s.trim()).filter(Boolean),
        experience: resume.experiences.map(exp => ({
          company: exp.company,
          position: exp.role,
          duration: exp.duration,
          bullets: exp.bullets.filter(b => b.trim()),
        })),
      };
      localStorage.setItem('resumeData', JSON.stringify(resumeDataForATS));
    } catch (err) {
      console.error('Failed to save resume data:', err);
    }
  }, [resume]);

  return (
    <section className="editor">
      {/* LEFT PANEL */}
      <div className="editor-panel">
        <div className="editor-header">
          <h2 className="editor-title">Resume Editor</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {templateId && (
              <span style={{
                fontSize: '13px',
                color: '#666',
                padding: '4px 12px',
                background: '#e3f2fd',
                borderRadius: '8px'
              }}>
                Template: {templateId}
              </span>
            )}
            <span className="progress-badge">{progress}% complete</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px',
            background: '#fee',
            color: '#c33',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <label>Full Name</label>
        <input
          value={resume.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <label>Target Role</label>
        <input
          value={resume.title}
          onChange={(e) => updateField("title", e.target.value)}
        />

        <label>Professional Summary</label>
        <textarea
          value={resume.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Write or generate a summary"
        />

        <button
          className="btn-primary"
          onClick={generateSummary}
          disabled={loadingStates.summary}
        >
          {loadingStates.summary ? 'Generating...' : 'Generate with AI ✨'}
        </button>

        <label>Skills</label>
        <textarea
          value={resume.skills}
          onChange={(e) => updateField("skills", e.target.value)}
          placeholder="React, JavaScript, CSS, Node.js (comma separated)"
        />

        <h3 className="section-heading">Experience</h3>

        {resume.experiences.map((exp, i) => (
          <div key={i} className="experience-block">
            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(i, "company", e.target.value)
              }
            />
            <input
              placeholder="Role"
              value={exp.role}
              onChange={(e) => updateExperience(i, "role", e.target.value)}
            />
            <input
              placeholder="Duration (Jan 2023 – Present)"
              value={exp.duration}
              onChange={(e) =>
                updateExperience(i, "duration", e.target.value)
              }
            />

            <label>Responsibilities / Achievements</label>
            {exp.bullets.map((b, bi) => (
              <input
                key={bi}
                placeholder="• Bullet point"
                value={b}
                onChange={(e) =>
                  updateBullet(i, bi, e.target.value)
                }
              />
            ))}

            <div className="exp-actions">
              <button
                className="btn-ghost"
                type="button"
                onClick={() => addBullet(i)}
              >
                + Add Bullet
              </button>
              <button
                className="btn-ghost"
                onClick={() => generateBulletsForExp(i)}
                disabled={loadingStates.bullets[i]}
              >
                {loadingStates.bullets[i] ? 'Generating...' : 'AI Bullets ✨'}
              </button>
              <button
                className="btn-ghost"
                onClick={() => convertToSTAR(i)}
                disabled={loadingStates.star[i]}
              >
                {loadingStates.star[i] ? 'Converting...' : 'STAR Format ✨'}
              </button>
            </div>
          </div>
        ))}

        <button className="btn-ghost" onClick={addExperience}>
          + Add Experience
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="preview-panel">
        <div className="resume-card">
          <h1>{resume.name}</h1>
          <h3>{resume.title}</h3>

          <section>
            <h4>Summary</h4>
            <p>{resume.summary || "Your summary will appear here."}</p>
          </section>

          <section>
            <h4>Experience</h4>
            {resume.experiences.map((exp, i) => (
              <div key={i} className="preview-exp">
                <strong>
                  {exp.role || "Role"} — {exp.company || "Company"}
                </strong>
                <div className="preview-duration">
                  {exp.duration}
                </div>
                <ul>
                  {exp.bullets
                    .filter((b) => b.trim())
                    .map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h4>Skills</h4>
            <p>{resume.skills}</p>
          </section>
        </div>
      </div>
    </section>
  );
}
