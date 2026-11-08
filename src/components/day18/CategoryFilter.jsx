import React from "react";

export default function CategoryFilter({ categories, onSelect }) {
  return (
    <div className="vehicle-category-grid">
      {categories.map((category, index) => (
        <button
          className="vehicle-category-card"
          key={category.id}
          onClick={() => onSelect(category)}
          style={{ "--card-index": index }}
        >
          <img src={category.image} alt={category.name} onError={(event) => { event.currentTarget.src = "https://placehold.co/900x600/20251f/f2f2e9?text=Vehicle"; }} />
          <span className="category-icon">{category.icon}</span>
          <span className="category-card-content">
            <strong>{category.name}</strong>
            <small>{category.subtitle}</small>
            <span className="category-explore">Explore collection <b>↗</b></span>
          </span>
        </button>
      ))}
    </div>
  );
}
