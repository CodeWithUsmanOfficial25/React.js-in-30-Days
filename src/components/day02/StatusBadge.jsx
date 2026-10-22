
const statusStyles = {
  Completed: 'status-badge status-completed',
  'In progress': 'status-badge status-progress',
  Upcoming: 'status-badge status-upcoming',
}

function StatusBadge({ status }) {
  // Yahan status ke mutabiq badge ki styling select hoti hai.
  const badgeClass = statusStyles[status] || statusStyles.Upcoming

  return (
    <span className={badgeClass}>
      <span className="status-dot" />
      {status}
    </span>
  )
}

export default StatusBadge
