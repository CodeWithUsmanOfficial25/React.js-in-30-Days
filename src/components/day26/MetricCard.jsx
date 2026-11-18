export default function MetricCard({ item }) {
  return (
    <article className={`threat-metric metric-${item.tone}`}>
      <div className="metric-top">
        <span className="metric-icon">{item.icon}</span>
        <span className="metric-change">{item.change}</span>
      </div>
      <p>{item.label}</p>
      <strong>{item.value}</strong>
    </article>
  );
}
