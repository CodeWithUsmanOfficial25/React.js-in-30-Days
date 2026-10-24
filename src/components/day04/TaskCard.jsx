
function TaskCard({ task, onToggle }) {
  return (
    <article
      className={`task-card ${task.completed ? "is-complete" : ""}`}
    >
      <div className="task-card__main">
        <button
          type="button"
          className="task-check"
          onClick={() => onToggle(task.id)}
          aria-label={
            task.completed
              ? `Mark ${task.title} as incomplete`
              : `Mark ${task.title} as complete`
          }
        >
          {task.completed ? "✓" : ""}
        </button>

        <div className="task-details">
          <h3>{task.title}</h3>
          <p>{task.topic}</p>
        </div>
      </div>

      <div className="task-card__meta">
        <span className={`priority priority--${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <span className="task-status">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>
    </article>
  );
}

export default TaskCard;
