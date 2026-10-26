function FocusTask({ task, onToggle }) {
  return (
    <label className={`focus-task ${task.done ? "focus-task--done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span className="focus-task__check" aria-hidden="true">
        {task.done ? "✓" : ""}
      </span>
      <span className="focus-task__title">{task.title}</span>
      <span className={`focus-task__tag focus-task__tag--${task.category.toLowerCase()}`}>
        {task.category}
      </span>
    </label>
  );
}

export default FocusTask;
