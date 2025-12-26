
import React from 'react';

const ClassyPreview = ({ resume }) => (
    <div className="resume-card-classy">
        <h1>{resume.name || "YOUR NAME"}</h1>
        <div className="contact-line">
            {resume.phone || "555-488-1111"} | {resume.email || "email@gmail.com"} | {resume.location || "City, State"} {resume.linkedin && `| ${resume.linkedin}`}
        </div>

        {resume.summary && (
            <>
                <h4>SUMMARY</h4>
                <p>{resume.summary}</p>
            </>
        )}

        {resume.experiences && resume.experiences.some(exp => exp.company || exp.role) && (
            <>
                <h4>PROFESSIONAL EXPERIENCE</h4>
                {resume.experiences.map((exp, i) => (
                    (exp.company || exp.role) && (
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
                    )
                ))}
            </>
        )}

        {resume.education && resume.education.some(edu => edu.school || edu.degree) && (
            <>
                <h4>EDUCATION</h4>
                {resume.education.map((edu, i) => (
                    (edu.school || edu.degree) && (
                        <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{edu.school}</div>
                                <div>{edu.degree} {edu.field}</div>
                            </div>
                            <div>{edu.graduationYear}</div>
                        </div>
                    )
                ))}
            </>
        )}

        {resume.skills && (
            <>
                <h4>SKILLS</h4>
                <p>{resume.skills}</p>
            </>
        )}
    </div>
);

export default ClassyPreview;
