import { formatCurrency, getStockStatus } from "../../data/day12Data";

export default function ProductCard({ product, onEdit, onDelete, onAdjust }) {
  const status = getStockStatus(product);
  const percentage = Math.min(100, Math.round((product.quantity / Math.max(product.threshold * 3, 1)) * 100));

  return (
    <article className="product-card clay-surface">
      <div className="product-card-top">
        <div className="product-symbol">{product.category === "Electronics" ? "⌁" : product.category === "Home" ? "⌂" : product.category === "Office" ? "▤" : "◈"}</div>
        <button className="more-button" onClick={() => onEdit(product)} aria-label={`Edit ${product.name}`}>•••</button>
      </div>

      <div className="product-main-info">
        <span className="product-sku">{product.sku}</span>
        <h3>{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-stock-row">
        <div className="stock-ring" style={{ "--progress": `${percentage}%`, "--ring-color": status === "Out of stock" ? "#e16b69" : status === "Low stock" ? "#d9a64e" : "#56d99a" }}>
          <div className="stock-ring-inner">
            <strong>{product.quantity}</strong>
            <small>units</small>
          </div>
        </div>
        <div className="stock-info">
          <span className={`status-label ${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>
          <small>Alert at {product.threshold} units</small>
          <strong>{formatCurrency(product.price)}</strong>
          <small>per item</small>
        </div>
      </div>

      <div className="product-card-footer">
        <div className="stock-adjust">
          <button className="round-action" onClick={() => onAdjust(product.id, -1)} disabled={product.quantity === 0} aria-label="Decrease stock">−</button>
          <span>Stock</span>
          <button className="round-action add-stock" onClick={() => onAdjust(product.id, 1)} aria-label="Increase stock">＋</button>
        </div>
        <button className="delete-product" onClick={() => onDelete(product.id)} aria-label={`Delete ${product.name}`}>×</button>
      </div>
    </article>
  );
}