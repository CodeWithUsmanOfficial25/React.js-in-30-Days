export default function TaskCard({ task, onMove, onDelete }) {
  const nextStatus = {
    "To Do": "In Progress",
    "In Progress": "Review",
    "Review": "Done",
    "Done": "To Do"
  }

  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className={`task-tag tag-${task.color}`}>{task.tag}</span>
        <button className="task-menu" onClick={() => onDelete(task.id)} aria-label="Delete task">×</button>
      </div>
      <h4>{task.title}</h4>
      <p className="task-project">{task.project}</p>
      <div className="task-card-bottom">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>
          <i /> {task.priority}
        </span>
        <span className="task-due">◷ {task.due}</span>
      </div>
      <div className="task-card-footer">
        <span className={`avatar avatar-${task.color}`}>{task.assignee}</span>
        <button className="move-task" onClick={() => onMove(task.id, nextStatus[task.status])}>
          {task.status === "Done" ? "Reopen ↗" : "Move forward ↗"}
        </button>
      </div>
    </article>
  )
}
