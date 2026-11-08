import React, { useState } from "react";

export default function VehicleModal({ vehicle, onClose }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const variant = vehicle.variants[variantIndex];

  if (!vehicle) return null;

  return (
    <div className="vehicle-detail-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="vehicle-detail-page">
        <button className="detail-back" onClick={onClose}>← Back to models</button>
        <div className="detail-layout">
          <div className="detail-visual">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              onError={(event) => { event.currentTarget.src = "https://placehold.co/1000x700/20251f/f2f2e9?text=Vehicle"; }}
            />
            <span className="detail-image-label">MODEL SPOTLIGHT</span>
          </div>
          <div className="detail-information">
            <span className="vehicle-eyebrow">VEHICLE CONFIGURATION</span>
            <h2>{vehicle.name}</h2>
            <p className="detail-description">{vehicle.description}</p>
            <div className="detail-spec-grid">
              <div><small>Vehicle type</small><strong>{vehicle.type}</strong></div>
              <div><small>Engine / Battery</small><strong>{vehicle.engine}</strong></div>
              <div><small>Power / Output</small><strong>{vehicle.power}</strong></div>
              <div><small>Starting price</small><strong>{vehicle.price.toLocaleString("en-US")}</strong></div>
            </div>
            <div className="variant-heading">
              <div><span className="vehicle-eyebrow">MAKE IT YOURS</span><h3>Choose your variant</h3></div>
              <span className="variant-count">03 OPTIONS</span>
            </div>
            <div className="variant-options">
              {vehicle.variants.map((item, index) => (
                <button className={`variant-option ${variantIndex === index ? "active" : ""}`} key={item.name} onClick={() => setVariantIndex(index)}>
                  <span>{item.name}</span><strong>{item.price.toLocaleString("en-US")}</strong>
                </button>
              ))}
            </div>
            <div className="selected-variant">
              <div className="selected-variant-top"><span>SELECTED CONFIGURATION</span><strong>{variant.name}</strong></div>
              <div className="selected-variant-specs">
                <div><small>Engine</small><strong>{variant.engine}</strong></div>
                <div><small>Power</small><strong>{variant.power}</strong></div>
                <div><small>Transmission</small><strong>{variant.transmission}</strong></div>
              </div>
              <ul>{variant.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
