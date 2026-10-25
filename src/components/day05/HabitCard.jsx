function HabitCard({ habit, onToggle }) {
  return (
    <article className={`habit-card habit-card--${habit.color} ${habit.completed ? "habit-card--done" : ""}`}>
      <div className="habit-card__top">
        <span className="habit-emoji" aria-hidden="true">{habit.emoji}</span>
        <span className="habit-category">{habit.category}</span>
      </div>

      <h3>{habit.name}</h3>

      <button
        type="button"
        className={`habit-toggle ${habit.completed ? "habit-toggle--done" : ""}`}
        onClick={() => onToggle(habit.id)}
        aria-pressed={habit.completed}
        aria-label={`${habit.completed ? "Mark incomplete" : "Complete"}: ${habit.name}`}
      >
        <span className="habit-toggle__check" aria-hidden="true">
          {habit.completed ? "✓" : ""}
        </span>
        {habit.completed ? "Completed" : "Mark complete"}
      </button>
    </article>
  );
}

export default HabitCard;
