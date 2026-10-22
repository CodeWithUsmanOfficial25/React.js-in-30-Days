
import StatusBadge from './StatusBadge.jsx'

function TopicCard({ topic }) {
  // Props ke zariye parent component se topic ka data milta hai.
  return (
    <article className="topic-card">
      <div className="topic-card-top">
        <span className="topic-number">{topic.number}</span>
        <StatusBadge status={topic.status} />
      </div>

      <span className="topic-category">{topic.category}</span>

      <h3>{topic.title}</h3>

      <p className="topic-description">{topic.description}</p>

      <div className="topic-example">
        <span className="example-label">Example</span>
        <code>{topic.example}</code>
      </div>
    </article>
  )
}

export default TopicCard
