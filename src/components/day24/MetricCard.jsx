export default function MetricCard({ label, value, change, icon, tone, detail }) {
  return (
    <article className={`metric-card metric-${tone}`}>
      <div className="metric-top">
        <span className="metric-icon">{icon}</span>
        <span className="metric-change">{change}</span>
      </div>
      <p className="metric-label">{label}</p>
      <div className="metric-value">{value}</div>
      <p className="metric-detail">{detail}</p>
    </article>
  )
}
