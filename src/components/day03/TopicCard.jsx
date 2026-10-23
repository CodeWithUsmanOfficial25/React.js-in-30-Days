
import StatusBadge from './StatusBadge.jsx'

function TopicCard({ topic, onToggleStatus }) {
  // Parent se topic data aur status update karne wala function milta hai.
  const isCompleted = topic.status === 'Completed'

  return (
    <article className="day03-topic-card">
      <div className="day03-card-top">
        <span className="day03-topic-number">{topic.number}</span>
        <StatusBadge status={topic.status} />
      </div>

      <span className="day03-category">{topic.category}</span>

      <h3>{topic.title}</h3>
      <p className="day03-description">{topic.description}</p>

      <div className="day03-example">
        <span>CODE EXAMPLE</span>
        <code>{topic.example}</code>
      </div>

      <button
        className={`day03-complete-button ${
          isCompleted ? 'is-completed' : ''
        }`}
        type="button"
        onClick={() => onToggleStatus(topic.id)}
        aria-label={
          isCompleted
            ? `Mark ${topic.title} as practicing`
            : `Mark ${topic.title} as completed`
        }
      >
        {isCompleted ? '✓ Completed' : 'Mark as completed'}
      </button>
    </article>
  )
}

export default TopicCard
