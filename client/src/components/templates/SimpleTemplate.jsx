
import React from 'react';

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

export default SimplePreview;
