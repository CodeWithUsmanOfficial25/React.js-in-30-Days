import React, { useState } from "react";

const fallbackImage =
  "https://placehold.co/900x600/20251f/f2f2e9?text=Vehicle+Image";

export default function VehicleCard({ vehicle, onSelect, index }) {
  const [imageSrc, setImageSrc] = useState(vehicle.image);

  return (
    <button
      className="vehicle-card"
      onClick={() => onSelect(vehicle)}
      style={{ "--card-index": index }}
    >
      <div className="vehicle-card-image">
        <img
          src={imageSrc}
          alt={vehicle.name}
          loading="lazy"
          onError={() => setImageSrc(fallbackImage)}
        />

        <span className="vehicle-card-type">{vehicle.type}</span>
        <span className="vehicle-card-arrow">↗</span>
      </div>

      <div className="vehicle-card-info">
        <div>
          <span className="vehicle-eyebrow">FEATURED MODEL</span>
          <h3>{vehicle.name}</h3>
          <p>
            {vehicle.engine} <span>·</span> {vehicle.power}
          </p>
        </div>

        <span className="vehicle-open">View model</span>
      </div>
    </button>
  );
}
