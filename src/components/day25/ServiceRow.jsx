export default function ServiceRow({ service, total }) {
  const percentage = Math.round(service.spend / total * 100)
  return (
    <div className="service-row">
      <span className={`service-icon service-${service.color}`}>{service.icon}</span>
      <div className="service-info">
        <strong>{service.name}</strong>
        <small>{service.category} · {service.resources} resources</small>
      </div>
      <div className="service-usage">
        <div className="service-usage-top"><span>{percentage}% of spend</span><strong>${service.spend.toLocaleString()}</strong></div>
        <div className="service-progress"><i style={{ width: `${percentage}%` }} /></div>
      </div>
    </div>
  )
}
