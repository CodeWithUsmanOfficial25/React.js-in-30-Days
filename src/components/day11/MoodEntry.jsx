import { formatDate, getMood } from "../../data/day11Data";

export default function MoodEntry({ entry, onDelete }) {
  const mood = getMood(entry.mood);

  return (
    <article className="entry-card">
      <div className="entry-mood" style={{ "--mood-color": mood.color }}>
        {mood.emoji}
      </div>
      <div className="entry-details">
        <div className="entry-heading">
          <strong>{mood.label} day</strong>
          <span>{formatDate(entry.date)}</span>
        </div>
        <p>{entry.note}</p>
        <small>{entry.createdAt}</small>
      </div>
      <button className="delete-entry" onClick={() => onDelete(entry.id)} aria-label="Delete journal entry">×</button>
    </article>
  );
}