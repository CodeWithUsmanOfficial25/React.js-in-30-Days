export default function MoodOption({ mood, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`mood-option ${selected ? "selected" : ""}`}
      onClick={() => onSelect(mood.id)}
      aria-pressed={selected}
    >
      <span className="mood-circle" style={{ "--mood-color": mood.color }}>
        <span>{mood.emoji}</span>
      </span>
      <strong>{mood.label}</strong>
      <small>{mood.description}</small>
    </button>
  );
}