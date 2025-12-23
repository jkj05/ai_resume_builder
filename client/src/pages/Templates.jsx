import { useState, useEffect } from "react";
import * as api from "../utils/api";

export default function Templates() {
  const [selected, setSelected] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const data = await api.getTemplates();
      setTemplates(data.templates || []);
      if (data.templates && data.templates.length > 0) {
        setSelected(data.templates[0].id);
      }
    } catch (err) {
      setError('Failed to load templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section>
        <h2 className="page-title">Choose a Template</h2>
        <p>Loading templates...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="page-title">Choose a Template</h2>
        <p style={{ color: '#f44336' }}>{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="page-title">Choose a Template</h2>
      <p className="page-subtitle">
        Select from {templates.length} professional resume templates
      </p>

      <div className="template-grid">
        {templates.map((t) => (
          <div
            key={t.id}
            className={`template-card ${selected === t.id ? "active" : ""}`}
            onClick={() => setSelected(t.id)}
          >
            <div className="template-preview">
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{t.name}</h3>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                {t.description}
              </p>
              <div style={{
                display: 'flex',
                gap: '8px',
                fontSize: '12px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  padding: '2px 8px',
                  background: '#e3f2fd',
                  color: '#1976d2',
                  borderRadius: '12px'
                }}>
                  {t.category}
                </span>
                {t.isPremium && (
                  <span style={{
                    padding: '2px 8px',
                    background: '#fff3e0',
                    color: '#f57c00',
                    borderRadius: '12px'
                  }}>
                    Premium
                  </span>
                )}
              </div>
            </div>
            <div className="template-status">
              {selected === t.id ? "✓ Selected" : "Click to select"}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button className="btn-primary">
            Use This Template
          </button>
        </div>
      )}
    </section>
  );
}

