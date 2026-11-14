import React, { useEffect } from "react";

export default function AnimalModal({ animal, onClose }) {
  useEffect(() => {
    if (!animal) return;
    const handleKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [animal, onClose]);

  if (!animal) return null;

  return (
    <div className="animal-modal-backdrop" onClick={onClose}>
      <section className="animal-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-image">
          <img src={animal.image} alt={animal.name} />
        </div>
        <div className="modal-details">
          <span className="modal-eyebrow">WILDORA SPECIES PROFILE</span>
          <h2>{animal.emoji} {animal.name}</h2>
          <p className="wild-scientific">{animal.scientific}</p>
          <p className="modal-description">{animal.description}</p>
          <div className="modal-facts">
            <div><span>Habitat</span><strong>{animal.habitat}</strong></div>
            <div><span>Conservation</span><strong>{animal.status}</strong></div>
            <div><span>Population</span><strong>{animal.population}</strong></div>
          </div>
          <div className="animal-fact">
            <span>✦ DID YOU KNOW?</span>
            <p>{animal.fact}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
