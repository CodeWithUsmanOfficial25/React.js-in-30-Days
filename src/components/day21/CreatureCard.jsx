import React from "react";

export default function CreatureCard({ creature, index, onSelect }) {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 13}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 15}deg`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article
      className="creature-card"
      style={{ "--card-index": index }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      onClick={() => onSelect(creature)}
    >
      <div className="creature-image-wrap">
        <img src={creature.image} alt={creature.name} className="creature-image" loading="lazy" />
        <span className="creature-status">{creature.status}</span>
        <span className="creature-depth">{creature.depth}</span>
        <div className="creature-image-shade" />
      </div>
      <div className="creature-info">
        <span className="creature-habitat">{creature.habitat}</span>
        <h3>{creature.name}</h3>
        <p>{creature.scientific}</p>
        <button className="creature-explore" type="button" onClick={(event) => { event.stopPropagation(); onSelect(creature); }}>
          Explore species <span>↗</span>
        </button>
      </div>
    </article>
  );
}
