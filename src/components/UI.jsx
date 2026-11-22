import React from "react";

export function PageHeading({ eyebrow, title, description, action }) {
  return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action && <div className="heading-action">{action}</div>}</div>;
}

export const MetricCard = React.memo(function MetricCard({ label, value, change, icon, color, note }) {
  return <article className={`metric-card metric-${color}`}><div className="metric-top"><span>{label}</span><span className="metric-icon">{icon}</span></div><strong>{value}</strong><div className="metric-bottom"><span className="positive">{change}</span><span>{note}</span></div><div className="metric-glow" /></article>;
});

export function Panel({ title, subtitle, action, children, className = "" }) {
  return <section className={`panel ${className}`}><div className="panel-heading"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>;
}

export function StatusPill({ children }) {
  return <span className={`status-pill status-${String(children).toLowerCase().replaceAll(" ", "-")}`}>{children}</span>;
}

export function EmptyState({ icon = "✦", title, detail }) {
  return <div className="empty-state"><span>{icon}</span><h3>{title}</h3><p>{detail}</p></div>;
}

export function Modal({ title, onClose, children }) {
  return <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}><section className="modal-card"><div className="modal-heading"><h2>{title}</h2><button className="icon-button" onClick={onClose}>✕</button></div>{children}</section></div>;
}

export function SearchBox({ value, onChange, placeholder = "Search anything..." }) {
  return <label className="search-box"><span>⌕</span><input value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} /></label>;
}
