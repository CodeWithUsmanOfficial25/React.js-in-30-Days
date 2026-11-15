import React from "react";

export default function GalleryCard({ item, index }) {
  return (
    <figure className={`aero-gallery-card aero-gallery-${index + 1}`}>
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="aero-gallery-overlay" />
      <figcaption>
        <span>{item.category}</span>
        <strong>{item.title}</strong>
      </figcaption>
    </figure>
  );
}
