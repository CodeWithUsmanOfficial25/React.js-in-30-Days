export default function ActivityFeed({ activities }) {
  return (
    <div className="activity-list">
      {activities.map((item, index) => (
        <div className="activity-item" key={`${item.name}-${index}`}>
          <span className={`avatar avatar-${item.color}`}>{item.initials}</span>
          <div className="activity-copy">
            <p><strong>{item.name}</strong> {item.action} <b>{item.target}</b></p>
            <span>{item.time}</span>
          </div>
          <span className="activity-dot" />
        </div>
      ))}
    </div>
  )
}
