import React from "react";

export default function VehicleCard({ vehicle, onSelect, index }) {
  return (
    <button className="vehicle-card" onClick={() => onSelect(vehicle)} style={{ "--card-index": index }}>
      <div className="vehicle-card-image">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          onError={(event) => { event.currentTarget.src = "https://placehold.co/900x600/20251f/f2f2e9?text=Vehicle+Preview"; }}
        />
        <span className="vehicle-card-type">{vehicle.type}</span>
        <span className="vehicle-card-arrow">↗</span>
      </div>
      <div className="vehicle-card-info">
        <div>
          <span className="vehicle-eyebrow">FEATURED MODEL</span>
          <h3>{vehicle.name}</h3>
          <p>{vehicle.engine} <span>·</span> {vehicle.power}</p>
        </div>
        <span className="vehicle-open">View model</span>
      </div>
    </button>
  );
}
