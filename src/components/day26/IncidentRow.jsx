export default function IncidentRow({ incident, selected, onSelect }) {
  return (
    <button className={`incident-row ${selected ? "incident-selected" : ""}`} onClick={() => onSelect(incident)}>
      <span className={`severity-mark severity-${incident.severity.toLowerCase()}`} />
      <span className="incident-main">
        <strong>{incident.title}</strong>
        <small>{incident.id} · {incident.category} · {incident.time}</small>
      </span>
      <span className={`severity-label severity-text-${incident.severity.toLowerCase()}`}>{incident.severity}</span>
      <span className="incident-status">{incident.status}</span>
      <span className="incident-arrow">›</span>
    </button>
  );
}
