export default function RecommendationCard({ item, onApply, onDismiss }) {
  return (
    <article className="recommendation-card">
      <div className="recommendation-top">
        <span className={`recommendation-icon rec-${item.category === "AI & ML" ? "orange" : item.category === "Storage" ? "cyan" : item.category === "Database" ? "purple" : "blue"}`}>{item.icon}</span>
        <span className={`impact impact-${item.impact.toLowerCase()}`}>{item.impact} impact</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="saving-row"><span>Potential monthly saving</span><strong>${item.saving.toLocaleString()}</strong></div>
      <div className="recommendation-actions">
        <button className="apply-button" onClick={() => onApply(item.id)}>Apply recommendation ↗</button>
        <button className="dismiss-button" onClick={() => onDismiss(item.id)}>Dismiss</button>
      </div>
    </article>
  )
}
