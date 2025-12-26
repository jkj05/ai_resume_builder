import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TEMPLATES = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Two-column layout with sidebar for contact info',
    category: 'Modern',
    previewImage: '/template-professional.png'
  },
  {
    id: 'classy',
    name: 'Classy',
    description: 'Traditional centered design with blue section headers',
    category: 'Classic',
    previewImage: '/template-classy.png'
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Minimal single-column layout with clean typography',
    category: 'Minimal',
    previewImage: '/template-simple.png'
  },
  {
    id: 'stylish',
    name: 'Stylish',
    description: 'Elegant design with navy header and gold accents',
    category: 'Modern',
    previewImage: '/template-stylish.png'
  }
];

export default function Templates() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('professional');

  const handleUseTemplate = () => {
    if (selected) {
      navigate(`/editor?template=${selected}`);
    }
  };

  return (
    <section>
      <h2 className="page-title">Choose a Template</h2>
      <p className="page-subtitle">
        Select from {TEMPLATES.length} professional resume templates
      </p>

      <div className="template-grid">
        {TEMPLATES.map((t) => (
          <div
            key={t.id}
            className={`template-card ${selected === t.id ? "active" : ""}`}
            onClick={() => setSelected(t.id)}
          >
            <div className="template-preview">
              <img
                src={t.previewImage}
                alt={t.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}
              />
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
          <button className="btn-primary" onClick={handleUseTemplate}>
            Use This Template
          </button>
        </div>
      )}
    </section>
  );
}
