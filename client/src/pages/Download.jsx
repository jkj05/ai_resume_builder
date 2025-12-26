import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

export default function Download() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [templateId, setTemplateId] = useState('professional');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        const data = JSON.parse(saved);
        setResumeData(data);
        setTemplateId(data.selectedTemplate || 'professional');
      }
    } catch (err) {
      console.error('Failed to load resume data:', err);
    }
  }, []);

  const generatePDF = () => {
    if (!resumeData) {
      alert('No resume data found. Please create your resume in the Editor first.');
      return;
    }

    setLoading(true);

    try {
      const doc = new jsPDF();
      let yPosition = 20;
      const marginLeft = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxWidth = pageWidth - 40;

      // Helper function to add text with word wrap
      const addText = (text, fontSize, isBold = false, leftMargin = marginLeft) => {
        doc.setFontSize(fontSize);
        if (isBold) {
          doc.setFont(undefined, 'bold');
        } else {
          doc.setFont(undefined, 'normal');
        }

        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, leftMargin, yPosition);
        yPosition += lines.length * fontSize * 0.5 + 2;
      };

      // Name
      if (resumeData.personalInfo?.name) {
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text(resumeData.personalInfo.name, marginLeft, yPosition);
        yPosition += 10;
      }

      // Title
      if (resumeData.personalInfo?.title) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(resumeData.personalInfo.title, marginLeft, yPosition);
        yPosition += 10;
        doc.setTextColor(0, 0, 0);
      }

      // Divider
      doc.setLineWidth(0.5);
      doc.line(marginLeft, yPosition, pageWidth - marginLeft, yPosition);
      yPosition += 8;

      // Summary
      if (resumeData.summary) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('SUMMARY', marginLeft, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const summaryLines = doc.splitTextToSize(resumeData.summary, maxWidth);
        doc.text(summaryLines, marginLeft, yPosition);
        yPosition += summaryLines.length * 5 + 8;
      }

      // Skills
      if (resumeData.skills && resumeData.skills.length > 0) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('SKILLS', marginLeft, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const skillsText = resumeData.skills.join(', ');
        const skillsLines = doc.splitTextToSize(skillsText, maxWidth);
        doc.text(skillsLines, marginLeft, yPosition);
        yPosition += skillsLines.length * 5 + 8;
      }

      // Experience
      if (resumeData.experience && resumeData.experience.length > 0) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('EXPERIENCE', marginLeft, yPosition);
        yPosition += 8;

        resumeData.experience.forEach((exp) => {
          // Check if we need a new page
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }

          // Company and Position
          doc.setFontSize(12);
          doc.setFont(undefined, 'bold');
          const positionText = `${exp.position || 'Position'} — ${exp.company || 'Company'}`;
          doc.text(positionText, marginLeft, yPosition);
          yPosition += 6;

          // Duration
          if (exp.duration) {
            doc.setFontSize(9);
            doc.setFont(undefined, 'italic');
            doc.setTextColor(100, 100, 100);
            doc.text(exp.duration, marginLeft, yPosition);
            yPosition += 5;
            doc.setTextColor(0, 0, 0);
          }

          // Bullets
          if (exp.bullets && exp.bullets.length > 0) {
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            exp.bullets.forEach((bullet) => {
              if (bullet.trim()) {
                const bulletLines = doc.splitTextToSize(`• ${bullet}`, maxWidth - 5);
                doc.text(bulletLines, marginLeft + 3, yPosition);
                yPosition += bulletLines.length * 5;
              }
            });
          }

          yPosition += 5;
        });
      }

      // Save the PDF
      const fileName = `${resumeData.personalInfo?.name?.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadText = () => {
    if (!resumeData) {
      alert('No resume data found. Please create your resume in the Editor first.');
      return;
    }

    try {
      let textContent = '';

      // Name and Title
      if (resumeData.personalInfo?.name) {
        textContent += `${resumeData.personalInfo.name}\n`;
      }
      if (resumeData.personalInfo?.title) {
        textContent += `${resumeData.personalInfo.title}\n`;
      }
      textContent += '\n' + '='.repeat(50) + '\n\n';

      // Summary
      if (resumeData.summary) {
        textContent += 'SUMMARY\n';
        textContent += `${resumeData.summary}\n\n`;
      }

      // Skills
      if (resumeData.skills && resumeData.skills.length > 0) {
        textContent += 'SKILLS\n';
        textContent += `${resumeData.skills.join(', ')}\n\n`;
      }

      // Experience
      if (resumeData.experience && resumeData.experience.length > 0) {
        textContent += 'EXPERIENCE\n\n';
        resumeData.experience.forEach((exp) => {
          textContent += `${exp.position || 'Position'} — ${exp.company || 'Company'}\n`;
          if (exp.duration) {
            textContent += `${exp.duration}\n`;
          }
          if (exp.bullets && exp.bullets.length > 0) {
            exp.bullets.forEach((bullet) => {
              if (bullet.trim()) {
                textContent += `• ${bullet}\n`;
              }
            });
          }
          textContent += '\n';
        });
      }

      // Create download
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personalInfo?.name?.replace(/\s+/g, '_') || 'Resume'}_Resume.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Text download failed:', error);
      alert('Failed to download text version. Please try again.');
    }
  };

  return (
    <section>
      <h2 className="page-title">Download Resume</h2>
      <p className="page-subtitle">
        Export your resume in ATS-friendly PDF format
        {templateId && <span style={{ marginLeft: '8px', color: '#2563eb' }}>
          (Template: {templateId.charAt(0).toUpperCase() + templateId.slice(1)})
        </span>}
      </p>

      {!resumeData && (
        <div style={{
          padding: '16px',
          background: '#fff3cd',
          borderRadius: '8px',
          marginBottom: '16px',
          color: '#856404',
        }}>
          ⚠️ No resume data found. Please create your resume in the Editor first.
        </div>
      )}

      <div className="download-options" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
      }}>
        <button
          className="btn-primary"
          onClick={generatePDF}
          disabled={loading || !resumeData}
        >
          {loading ? 'Generating...' : '📄 Download PDF'}
        </button>

        <button
          className="btn-ghost"
          onClick={downloadText}
          disabled={!resumeData}
        >
          📝 Download Text Version
        </button>

        <div style={{
          marginTop: '16px',
          padding: '16px',
          background: '#e3f2fd',
          borderRadius: '8px',
          fontSize: '14px',
        }}>
          <strong>💡 Tip:</strong> The PDF version is ATS-friendly and uses a clean, professional format that passes automated screening systems.
        </div>
      </div>

      {resumeData && (
        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #dee2e6',
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Resume Preview</h3>
          <div style={{ fontSize: '14px', color: '#495057' }}>
            <p><strong>Name:</strong> {resumeData.personalInfo?.name || 'Not set'}</p>
            <p><strong>Title:</strong> {resumeData.personalInfo?.title || 'Not set'}</p>
            <p><strong>Experience Entries:</strong> {resumeData.experience?.length || 0}</p>
            <p><strong>Skills:</strong> {resumeData.skills?.length || 0} listed</p>
          </div>
        </div>
      )}
    </section>
  );
}
