import React from "react";

export default function AnimalCard({ animal, onSelect, index }) {
  return (
    <article
      className="wild-card"
      style={{ "--card-index": index }}
      onClick={() => onSelect(animal)}
      onKeyDown={(event) => event.key === "Enter" && onSelect(animal)}
      role="button"
      tabIndex={0}
    >
      <div className="wild-card-image">
        <img src={animal.image} alt={animal.name} loading="lazy" />
        <span className={`wild-status ${animal.status === "Endangered" ? "danger" : ""}`}>
          {animal.status}
        </span>
        <span className="wild-animal-emoji">{animal.emoji}</span>
        <div className="wild-image-overlay" />
      </div>
      <div className="wild-card-content">
        <div className="wild-card-meta">
          <span>{animal.habitat}</span>
          <span>#{String(animal.id).padStart(2, "0")}</span>
        </div>
        <h3>{animal.name}</h3>
        <p className="wild-scientific">{animal.scientific}</p>
        <div className="wild-card-bottom">
          <span className="wild-population">{animal.population} population</span>
          <span className="wild-arrow">↗</span>
        </div>
      </div>
    </article>
  );
}
