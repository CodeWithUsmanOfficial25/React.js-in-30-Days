import React, { useEffect } from "react";

export default function AircraftModal({ plane, onClose }) {
  useEffect(() => {
    if (!plane) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [plane, onClose]);

  if (!plane) return null;

  return (
    <div className="aircraft-modal-backdrop" onClick={onClose}>
      <section className="aircraft-modal" onClick={(event) => event.stopPropagation()}>
        <button className="aircraft-modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="aircraft-modal-image">
          <img src={plane.image} alt={plane.name} />
        </div>
        <div className="aircraft-modal-content">
          <span className="aero-eyebrow">AEROLITH / FLIGHT DATABASE</span>
          <h2>{plane.name}</h2>
          <p>{plane.description}</p>
          <div className="aircraft-spec-grid">
            <div><span>Maximum speed</span><strong>{plane.speed}</strong></div>
            <div><span>Flight range</span><strong>{plane.range}</strong></div>
            <div><span>First service</span><strong>{plane.year}</strong></div>
            <div><span>Origin</span><strong>{plane.origin}</strong></div>
          </div>
          <span className="aircraft-modal-tag">{plane.tag}</span>
        </div>
      </section>
    </div>
  );
}
