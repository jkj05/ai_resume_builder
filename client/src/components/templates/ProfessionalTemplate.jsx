
import React from 'react';

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

export default ProfessionalPreview;
