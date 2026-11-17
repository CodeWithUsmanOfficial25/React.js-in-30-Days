export default function CostMetric({ label, value, change, note, icon, tone }) {
  return (
    <article className={`cost-metric metric-${tone}`}>
      <div className="cost-metric-top">
        <span className="cost-metric-icon">{icon}</span>
        <span className="cost-change">{change}</span>
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}
