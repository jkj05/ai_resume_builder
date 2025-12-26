
import React from 'react';

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

export default StylishPreview;
