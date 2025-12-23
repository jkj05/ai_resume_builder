import { useState, useEffect } from "react";
import * as api from "../utils/api";

export default function ATS() {
  const [jobDesc, setJobDesc] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  // Load resume data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        setResumeData(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load resume data:', err);
    }
  }, []);

  const analyze = async () => {
    if (!jobDesc.trim()) {
      setError("Please paste a job description");
      return;
    }

    if (!resumeData) {
      setError("No resume found. Please create a resume in the Editor first.");
      return;
    }

    setAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await api.analyzeATS({
        resumeData,
        jobDescription: jobDesc,
      });

      setAnalysis(result);
    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#f44336';
  };

  return (
    <section>
      <h2 className="page-title">ATS Analyzer</h2>
      <p className="page-subtitle">
        Paste a job description to see how well your resume matches.
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

      <textarea
        className="ats-input"
        placeholder="Paste job description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={8}
      />

      <button
        className="btn-primary"
        onClick={analyze}
        disabled={analyzing || !resumeData}
      >
        {analyzing ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {error && (
        <div style={{
          padding: '12px',
          background: '#fee',
          color: '#c33',
          borderRadius: '8px',
          marginTop: '16px',
          fontSize: '14px',
        }}>
          {error}
        </div>
      )}

      {!analysis && !analyzing && !error && (
        <div className="empty-state">
          <p>
            No analysis yet. Paste a job description and click "Analyze Resume".
          </p>
        </div>
      )}

      {analysis && (
        <div className="ats-result">
          <h3 style={{
            fontSize: '24px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            ATS Score:
            <strong style={{
              color: getScoreColor(analysis.overallScore || analysis.score),
              fontSize: '32px',
            }}>
              {analysis.overallScore || analysis.score}%
            </strong>
          </h3>

          {/* Category Scores */}
          {analysis.categoryScores && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
                <strong>Technical Skills</strong>
                <div style={{ fontSize: '20px', color: getScoreColor(analysis.categoryScores.technicalSkills) }}>
                  {analysis.categoryScores.technicalSkills}%
                </div>
              </div>
              <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
                <strong>Experience</strong>
                <div style={{ fontSize: '20px', color: getScoreColor(analysis.categoryScores.experience) }}>
                  {analysis.categoryScores.experience}%
                </div>
              </div>
              <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
                <strong>Keywords</strong>
                <div style={{ fontSize: '20px', color: getScoreColor(analysis.categoryScores.keywords) }}>
                  {analysis.categoryScores.keywords}%
                </div>
              </div>
            </div>
          )}

          <div className="ats-metrics">
            <div>
              <strong style={{ fontSize: '16px', marginBottom: '8px', display: 'block' }}>
                ✅ Matched Keywords
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysis.matchedKeywords && analysis.matchedKeywords.length > 0 ? (
                  analysis.matchedKeywords.map((keyword, i) => (
                    <span key={i} style={{
                      padding: '4px 12px',
                      background: '#d4edda',
                      color: '#155724',
                      borderRadius: '16px',
                      fontSize: '14px',
                    }}>
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p style={{ color: '#666' }}>No matched keywords</p>
                )}
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <strong style={{ fontSize: '16px', marginBottom: '8px', display: 'block' }}>
                ❌ Missing Keywords
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysis.missingKeywords && analysis.missingKeywords.length > 0 ? (
                  analysis.missingKeywords.map((keyword, i) => (
                    <span key={i} style={{
                      padding: '4px 12px',
                      background: '#f8d7da',
                      color: '#721c24',
                      borderRadius: '16px',
                      fontSize: '14px',
                    }}>
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p style={{ color: '#666' }}>All keywords matched!</p>
                )}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions && analysis.suggestions.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '12px' }}>💡 Improvement Suggestions</h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {analysis.suggestions.map((suggestion, i) => (
                  <li key={i} style={{
                    padding: '12px',
                    background: '#e3f2fd',
                    borderLeft: '4px solid #2196F3',
                    borderRadius: '4px',
                  }}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
