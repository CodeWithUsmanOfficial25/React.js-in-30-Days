import React from "react";

export default function HabitatCard({ habitat, index }) {
  return (
    <article className="habitat-card" style={{ "--habitat-index": index }}>
      <img src={habitat.image} alt={habitat.name} loading="lazy" />
      <div className="habitat-shade" />
      <div className="habitat-content">
        <span className="habitat-icon">{habitat.icon}</span>
        <span className="habitat-type">{habitat.type}</span>
        <h3>{habitat.name}</h3>
        <p>{habitat.description}</p>
        <span className="habitat-count">{habitat.count}</span>
      </div>
    </article>
  );
}
