import React from "react";

export default function AircraftCard({ plane, index, onSelect }) {
  return (
    <article
      className="aircraft-card"
      style={{ "--card-index": index }}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(plane)}
      onKeyDown={(event) => event.key === "Enter" && onSelect(plane)}
    >
      <div className="aircraft-card-image">
        <img src={plane.image} alt={plane.name} loading="lazy" />
        <span className={`aircraft-tag ${plane.accent}`}>{plane.tag}</span>
        <span className="aircraft-number">AER / {String(plane.id).padStart(2, "0")}</span>
        <div className="aircraft-image-shade" />
      </div>
      <div className="aircraft-card-info">
        <div className="aircraft-card-type">{plane.type} <span>{plane.origin}</span></div>
        <h3>{plane.name}</h3>
        <div className="aircraft-card-bottom">
          <span>Explore specifications</span>
          <span className="aircraft-open">↗</span>
        </div>
      </div>
    </article>
  );
}
