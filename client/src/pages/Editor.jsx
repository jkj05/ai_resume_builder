import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../utils/api";

// Template Preview Components
const ProfessionalPreview = ({ resume }) => (
  <div className="resume-card-professional">
    <div className="sidebar">
      <h1>{resume.name || "YOUR NAME"}</h1>
      <h3>{resume.title || "Your Professional Title"}</h3>

      <h4>CONTACT</h4>
      <div className="contact-item">📞 {resume.phone || "(123) 456-7890"}</div>
      <div className="contact-item">✉️ {resume.email || "email@example.com"}</div>
      <div className="contact-item">📍 {resume.location || "City, State"}</div>
      {resume.linkedin && <div className="contact-item">💼 {resume.linkedin}</div>}

      <h4>SUMMARY</h4>
      <p style={{ fontSize: '12px', lineHeight: '1.6' }}>
        {resume.summary || "Your professional summary will appear here."}
      </p>
    </div>

    <div className="main-content">
      <h4>PROFESSIONAL EXPERIENCE</h4>
      {resume.experiences.map((exp, i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <div className="job-title">{exp.role || "Position"}</div>
          <div className="company">{exp.company || "Company"} | {exp.duration || "Date"}</div>
          <ul style={{ paddingLeft: '18px', marginTop: '6px' }}>
            {exp.bullets.filter(b => b.trim()).map((bullet, bi) => (
              <li key={bi} style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '4px' }}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}

      <h4 style={{ marginTop: '24px' }}>EDUCATION</h4>
      {resume.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{edu.degree} {edu.field}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{edu.school} | {edu.graduationYear}</div>
        </div>
      ))}

      <h4 style={{ marginTop: '24px' }}>SKILLS</h4>
      <p style={{ fontSize: '12px' }}>{resume.skills || "List your skills here"}</p>
    </div>
  </div>
);

const ClassyPreview = ({ resume }) => (
  <div className="resume-card-classy">
    <h1>{resume.name || "YOUR NAME"}</h1>
    <div className="contact-line">
      {resume.phone || "555-488-1111"} | {resume.email || "email@gmail.com"} | {resume.location || "City, State"} {resume.linkedin && `| ${resume.linkedin}`}
    </div>

    <h4>SUMMARY</h4>
    <p>{resume.summary || "Your professional summary will appear here."}</p>

    <h4>PROFESSIONAL EXPERIENCE</h4>
    {resume.experiences.map((exp, i) => (
      <div key={i} style={{ marginBottom: '20px' }}>
        <div>
          <span className="job-title">{exp.role || "Job Title"}</span>
          <span className="date" style={{ float: 'right' }}>{exp.duration || "Date"}</span>
        </div>
        <div className="company">{exp.company || "Company Name"}</div>
        <ul style={{ paddingLeft: '18px', marginTop: '6px' }}>
          {exp.bullets.filter(b => b.trim()).map((bullet, bi) => (
            <li key={bi}>{bullet}</li>
          ))}
        </ul>
      </div>
    ))}

    <h4>EDUCATION</h4>
    {resume.education.map((edu, i) => (
      <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 'bold' }}>{edu.school}</div>
          <div>{edu.degree} {edu.field}</div>
        </div>
        <div>{edu.graduationYear}</div>
      </div>
    ))}

    <h4>SKILLS</h4>
    <p>{resume.skills || "List your skills here"}</p>
  </div>
);

const SimplePreview = ({ resume }) => (
  <div className="resume-card-simple">
    <div className="header">
      <h1>{resume.name || "YOUR NAME"}</h1>
      <div className="contact">
        {resume.location || "City, State"}<br />
        {resume.email || "email@example.com"}<br />
        {resume.phone || "(555) 555-1234"}<br />
        {resume.linkedin}
      </div>
    </div>

    <div className="headline">{resume.summary || "Brief LinkedIn-style headline summarizing your abilities and top skills"}</div>

    <h4>Top Skills</h4>
    <p style={{ fontSize: '12px' }}>{resume.skills || "List your top skills here"}</p>

    <h4>Work Experience</h4>
    {resume.experiences.map((exp, i) => (
      <div key={i} style={{ marginBottom: '20px' }}>
        <div className="job-header">
          <div>
            <div className="company">{exp.company || "Company"}</div>
            <div className="job-title">{exp.role || "Job Title"}</div>
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>{exp.duration || "MM/YYYY-Present"}</div>
        </div>
        <ul>
          {exp.bullets.filter(b => b.trim()).map((bullet, bi) => (
            <li key={bi}>{bullet}</li>
          ))}
        </ul>
      </div>
    ))}

    <h4>Education</h4>
    {resume.education.map((edu, i) => (
      <div key={i} style={{ fontSize: '12px', marginBottom: '8px' }}>
        {edu.degree}, {edu.graduationYear}, {edu.school}
      </div>
    ))}
  </div>
);

const StylishPreview = ({ resume }) => (
  <div className="resume-card-stylish">
    <div className="header-bar">
      <h1>{resume.name || "YOUR NAME"}</h1>
      <h3>{resume.title || "YOUR PROFESSIONAL TITLE"}</h3>
    </div>

    <div className="content-area">
      <div className="left-column">
        <h4>CONTACT</h4>
        <div className="contact-item">📞 {resume.phone || "123-456-7890"}</div>
        <div className="contact-item">✉️ {resume.email || "email@gmail.com"}</div>
        <div className="contact-item">📍 {resume.location || "City, State"}</div>
        {resume.linkedin && <div className="contact-item">💼 {resume.linkedin}</div>}

        <h4>EDUCATION</h4>
        {resume.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2C3E50' }}>{edu.degree} / {edu.field}</div>
            <div style={{ fontSize: '11px', color: '#666' }}>{edu.school}</div>
            <div style={{ fontSize: '11px', color: '#666' }}>{edu.graduationYear}</div>
          </div>
        ))}

        <h4>SKILLS</h4>
        <ul style={{ paddingLeft: '16px' }}>
          {(resume.skills || "").split(',').map((skill, i) => (
            skill.trim() && <li key={i} style={{ fontSize: '11px', marginBottom: '4px' }}>{skill.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="right-column">
        <h4>PROFILE</h4>
        <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#444' }}>
          {resume.summary || "Write a powerful performance summary here."}
        </p>

        <h4>PROFESSIONAL EXPERIENCE</h4>
        {resume.experiences.map((exp, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div className="job-title">{exp.role || "JOB TITLE"}</div>
            <div className="company">{exp.company || "Company Name"} | {exp.duration || "Date"}</div>
            <ul>
              {exp.bullets.filter(b => b.trim()).map((bullet, bi) => (
                <li key={bi}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Editor() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'professional';

  const [resume, setResume] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    skills: "",
    experiences: [{
      company: "",
      role: "",
      duration: "",
      bullets: [""],
    }],
    education: [{
      school: "",
      degree: "",
      field: "",
      graduationYear: "",
    }],
  });

  const [loadingStates, setLoadingStates] = useState({
    summary: false,
    bullets: {},
    star: {},
  });

  const [error, setError] = useState(null);

  // Load saved resume from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        const resumeData = JSON.parse(saved);
        setResume({
          name: resumeData.personalInfo?.name || "",
          title: resumeData.personalInfo?.title || "",
          email: resumeData.personalInfo?.email || "",
          phone: resumeData.personalInfo?.phone || "",
          location: resumeData.personalInfo?.location || "",
          linkedin: resumeData.personalInfo?.linkedin || "",
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
          education: resumeData.education?.length > 0 ? resumeData.education : [{
            school: "",
            degree: "",
            field: "",
            graduationYear: "",
          }],
        });
      }
    } catch (err) {
      console.error('Failed to load saved resume:', err);
    }
  }, []);

  /* Helpers */
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

  const updateEducation = (i, field, value) => {
    const edu = [...resume.education];
    edu[i][field] = value;
    setResume({ ...resume, education: edu });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, { school: "", degree: "", field: "", graduationYear: "" }],
    });
  };

  /* AI Functions */
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

  /* Progress */
  const progress = useMemo(() => {
    let score = 0;
    if (resume.name) score += 10;
    if (resume.title) score += 10;
    if (resume.email) score += 5;
    if (resume.phone) score += 5;
    if (resume.location) score += 5;
    if (resume.summary) score += 15;
    if (resume.skills) score += 15;
    if (resume.experiences.some((e) => e.company && e.role)) score += 20;
    if (resume.education.some((e) => e.school && e.degree)) score += 15;
    return Math.min(score, 100);
  }, [resume]);

  /* Persist to localStorage */
  useEffect(() => {
    try {
      const resumeDataForATS = {
        personalInfo: {
          name: resume.name,
          title: resume.title,
          email: resume.email,
          phone: resume.phone,
          location: resume.location,
          linkedin: resume.linkedin,
        },
        summary: resume.summary,
        skills: resume.skills.split(',').map(s => s.trim()).filter(Boolean),
        experience: resume.experiences.map(exp => ({
          company: exp.company,
          position: exp.role,
          duration: exp.duration,
          bullets: exp.bullets.filter(b => b.trim()),
        })),
        education: resume.education,
        selectedTemplate: templateId,
      };
      localStorage.setItem('resumeData', JSON.stringify(resumeDataForATS));
    } catch (err) {
      console.error('Failed to save resume data:', err);
    }
  }, [resume, templateId]);

  // Select preview component based on template
  const PreviewComponent = {
    professional: ProfessionalPreview,
    classy: ClassyPreview,
    simple: SimplePreview,
    stylish: StylishPreview,
  }[templateId] || ProfessionalPreview;

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

        {/* Personal Info */}
        <label>Full Name *</label>
        <input value={resume.name} onChange={(e) => updateField("name", e.target.value)} />

        <label>Target Role *</label>
        <input value={resume.title} onChange={(e) => updateField("title", e.target.value)} />

        {/* Contact Info */}
        <h3 className="section-heading">Contact Information</h3>

        <label>Email</label>
        <input value={resume.email} onChange={(e) => updateField("email", e.target.value)} placeholder="your.email@example.com" />

        <label>Phone</label>
        <input value={resume.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="(123) 456-7890" />

        <label>Location</label>
        <input value={resume.location} onChange={(e) => updateField("location", e.target.value)} placeholder="City, State" />

        <label>LinkedIn</label>
        <input value={resume.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} placeholder="linkedin.com/in/yourname" />

        {/* Summary */}
        <h3 className="section-heading">Professional Summary</h3>
        <textarea
          value={resume.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Write or generate a summary"
          rows={4}
        />

        <button
          className="btn-primary"
          onClick={generateSummary}
          disabled={loadingStates.summary}
        >
          {loadingStates.summary ? 'Generating...' : 'Generate with AI ✨'}
        </button>

        {/* Skills */}
        <label>Skills (comma separated)</label>
        <textarea
          value={resume.skills}
          onChange={(e) => updateField("skills", e.target.value)}
          placeholder="React, JavaScript, CSS, Node.js"
          rows={2}
        />

        {/* Experience */}
        <h3 className="section-heading">Experience</h3>

        {resume.experiences.map((exp, i) => (
          <div key={i} className="experience-block">
            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(i, "company", e.target.value)}
            />
            <input
              placeholder="Role"
              value={exp.role}
              onChange={(e) => updateExperience(i, "role", e.target.value)}
            />
            <input
              placeholder="Duration (Jan 2023 – Present)"
              value={exp.duration}
              onChange={(e) => updateExperience(i, "duration", e.target.value)}
            />

            <label>Responsibilities / Achievements</label>
            {exp.bullets.map((b, bi) => (
              <input
                key={bi}
                placeholder="• Bullet point"
                value={b}
                onChange={(e) => updateBullet(i, bi, e.target.value)}
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

        {/* Education */}
        <h3 className="section-heading">Education</h3>

        {resume.education.map((edu, i) => (
          <div key={i} className="experience-block">
            <input
              placeholder="School / University"
              value={edu.school}
              onChange={(e) => updateEducation(i, "school", e.target.value)}
            />
            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(i, "degree", e.target.value)}
            />
            <input
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => updateEducation(i, "field", e.target.value)}
            />
            <input
              placeholder="Graduation Year"
              value={edu.graduationYear}
              onChange={(e) => updateEducation(i, "graduationYear", e.target.value)}
            />
          </div>
        ))}

        <button className="btn-ghost" onClick={addEducation}>
          + Add Education
        </button>

        {/* Download Section */}
        <h3 className="section-heading">Download Resume</h3>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <button
            className="btn-primary"
            onClick={() => window.location.href = '/download'}
            style={{ width: '100%' }}
          >
            📄 Download as PDF
          </button>
          <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
            Export your resume as ATS-friendly PDF using the {templateId} template
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Template Preview */}
      <div className="preview-panel">
        <PreviewComponent resume={resume} />
      </div>
    </section>
  );
}
