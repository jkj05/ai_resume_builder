import { useState } from "react";

export default function Templates() {
  const [selected, setSelected] = useState("Minimal");

  const templates = ["Minimal", "Professional", "Modern"];

  return (
    <section>
      <h2 className="page-title">Choose a Template</h2>

      <div className="template-grid">
        {templates.map((t) => (
          <div
            key={t}
            className={`template-card ${selected === t ? "active" : ""}`}
            onClick={() => setSelected(t)}
          >
            <div className="template-preview">{t} Template</div>
            <div className="template-status">
              {selected === t ? "Selected" : "Click to select"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
