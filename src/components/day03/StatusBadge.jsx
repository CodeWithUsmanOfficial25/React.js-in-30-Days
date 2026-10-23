
const statusClasses = {
  Practicing: 'day03-status day03-status-practicing',
  Completed: 'day03-status day03-status-completed',
  Upcoming: 'day03-status day03-status-upcoming',
}

function StatusBadge({ status }) {
  // Status ke hisaab se badge ka color change hota hai.
  const className =
    statusClasses[status] || statusClasses.Upcoming

  return (
    <span className={className}>
      <span className="day03-status-dot" />
      {status}
    </span>
  )
}

export default StatusBadge
