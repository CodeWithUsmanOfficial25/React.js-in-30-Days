export default function ServiceCard({ service, onInspect }) {
  const statusClass = service.status.toLowerCase()

  return (
    <button className="service-card" onClick={() => onInspect(service)} type="button">
      <div className="service-card-top">
        <span className="service-symbol" style={{ "--symbol": service.color }}>
          {service.name.slice(0, 1)}
        </span>
        <span className={`status-pill ${statusClass}`}>
          <i />
          {service.status}
        </span>
      </div>
      <div className="service-copy">
        <h3>{service.name}</h3>
        <p>{service.detail}</p>
      </div>
      <div className="service-metrics">
        <div>
          <span>Uptime</span>
          <strong>{service.uptime.toFixed(2)}%</strong>
        </div>
        <div>
          <span>Latency</span>
          <strong>{service.latency ? `${service.latency}ms` : "—"}</strong>
        </div>
      </div>
      <div className="service-card-bottom">
        <span>{service.region}</span>
        <span className="inspect-link">Inspect <b>↗</b></span>
      </div>
    </button>
  )
}