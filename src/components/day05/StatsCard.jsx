function StatsCard({ emoji, label, value, note, color }) {
  return (
    <article className={`stats-card stats-card--${color}`}>
      <span className="stats-card__emoji" aria-hidden="true">{emoji}</span>
      <p>{label}</p>
      <strong>{value}</strong>
      <span className="stats-card__note">{note}</span>
    </article>
  );
}

export default StatsCard;
