
import './Day01.css'

function Day01() {
  const topics = [
    {
      number: '01',
      title: 'JSX',
      description: 'Writing UI with HTML-like syntax inside JavaScript.',
      status: 'Completed',
    },
    {
      number: '02',
      title: 'Components',
      description: 'Building reusable parts of a React application.',
      status: 'In progress',
    },
    {
      number: '03',
      title: 'JavaScript Expressions',
      description: 'Displaying variables and dynamic values in JSX.',
      status: 'Up next',
    },
  ]

  const currentDay = 1
  const learnerName = 'Usman'

  return (
    <main className="day-one">
      <header className="page-header">
        <p className="eyebrow">MY LEARNING JOURNAL</p>
        <h1>React, day by day.</h1>
        <p className="intro">
          A practical record of what I build, learn, and improve.
        </p>
      </header>

      <section className="welcome">
        <div>
          <p className="section-label">DAY {String(currentDay).padStart(2, '0')}</p>
          <h2>Getting started with React</h2>
          <p>
            Welcome, {learnerName}. Today marks the beginning of a 30-day
            journey into building interfaces with React.
          </p>
        </div>

        <div className="day-number" aria-label="Day one">
          01
        </div>
      </section>

      <section className="topics-section">
        <div className="section-heading">
          <div>
            <p className="section-label">THE ROAD AHEAD</p>
            <h2>Today's concepts</h2>
          </div>
          <span className="topic-count">{topics.length} topics</span>
        </div>

        <div className="topic-list">
          {topics.map((topic) => (
            <article className="topic-card" key={topic.number}>
              <span className="topic-number">{topic.number}</span>

              <div className="topic-content">
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>

              <span
                className={`topic-status status-${topic.status
                  .toLowerCase()
                  .replace(' ', '-')}`}
              >
                {topic.status}
              </span>
            </article>
          ))}
        </div>
      </section>

      <footer className="day-footer">
        <p>30 days. Real code. Consistent progress.</p>
        <span>DAY 01 / 30</span>
      </footer>
    </main>
  )
}

export default Day01
