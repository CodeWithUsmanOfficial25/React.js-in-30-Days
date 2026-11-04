import React from "react";

function ProductCard({ product, quantity, onAdd, onRemove, isFavorite, onFavorite }) {
  return (
    <article className="h-product-card">
      <div className="h-product-image" style={{ backgroundColor: product.color }}>
        <span className="h-product-tag">{product.tag}</span>
        <button className={`h-favorite ${isFavorite ? "h-favorite-active" : ""}`} onClick={() => onFavorite(product.id)} aria-label="Toggle favorite">
          {isFavorite ? "♥" : "♡"}
        </button>
        <span className="h-product-emoji">{product.emoji}</span>
      </div>

      <div className="h-product-info">
        <span className="h-product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="h-product-rating">
          <span>★</span> {product.rating} <span className="h-rating-count"> · Fresh choice</span>
        </div>
        <div className="h-product-bottom">
          <div>
            <strong>${product.price.toFixed(2)}</strong>
            <span className="h-product-unit"> / {product.unit}</span>
          </div>
          {quantity > 0 ? (
            <div className="h-quantity-control">
              <button onClick={() => onRemove(product.id)} aria-label="Decrease quantity">−</button>
              <span>{quantity}</span>
              <button onClick={() => onAdd(product)} aria-label="Increase quantity">+</button>
            </div>
          ) : (
            <button className="h-add-button" onClick={() => onAdd(product)}>
              + Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
