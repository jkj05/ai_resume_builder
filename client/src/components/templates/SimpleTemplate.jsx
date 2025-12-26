
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

        {resume.summary && <div className="headline">{resume.summary}</div>}

        {resume.skills && (
            <>
                <h4>Top Skills</h4>
                <p style={{ fontSize: '12px' }}>{resume.skills}</p>
            </>
        )}

        {resume.experiences && resume.experiences.some(exp => exp.company || exp.role) && (
            <>
                <h4>Work Experience</h4>
                {resume.experiences.map((exp, i) => (
                    (exp.company || exp.role) && (
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
                    )
                ))}
            </>
        )}

        {resume.education && resume.education.some(edu => edu.school || edu.degree) && (
            <>
                <h4>Education</h4>
                {resume.education.map((edu, i) => (
                    (edu.school || edu.degree) && (
                        <div key={i} style={{ fontSize: '12px', marginBottom: '8px' }}>
                            {edu.degree}, {edu.graduationYear}, {edu.school}
                        </div>
                    )
                ))}
            </>
        )}
    </div>
);

export default SimplePreview;
