
import './Day02.css'
import { day02Stats, day02Topics } from '../data/day02Data.js'
import TopicCard from '../components/day02/TopicCard.jsx'

function Day02() {
  const learnerName = 'Usman'
  const completedTopics = day02Topics.filter(
    (topic) => topic.status === 'Completed',
  ).length

  const progress = Math.round(
    (completedTopics / day02Topics.length) * 100,
  )

  // Yahan condition ke mutabiq welcome message tayar hota hai.
  const welcomeMessage =
    completedTopics > 0
      ? 'Great start! Keep building your React foundation.'
      : 'Your learning journey starts here.'

  return (
    <main className="day02-page">
      <div className="day02-container">
        <header className="dashboard-header">
          <a className="brand" href="#overview" aria-label="React learning home">
            <span className="brand-mark">R</span>
            <span>React<span className="brand-light">Journey</span></span>
          </a>

          <div className="day-indicator">
            <span className="day-indicator-dot" />
            30-Day Challenge
          </div>
        </header>

        <section className="hero-section" id="overview">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              YOUR DEVELOPER JOURNEY
            </span>

            <h1>
              Build with React.
              <br />
              <span>One day at a time.</span>
            </h1>

            <p className="hero-description">
              Welcome back, {learnerName}. {welcomeMessage}
              Learn the concepts, build with purpose, and keep moving forward.
            </p>

            <a className="primary-link" href="#topics">
              Explore Day 02 <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="hero-visual" aria-label="Day 2 learning summary">
            <div className="visual-glow" />
            <div className="code-window">
              <div className="window-bar">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="window-file">Day02.jsx</span>
                <span className="window-language">JSX</span>
              </div>

              <div className="code-content">
                <p><span className="code-muted">01</span> <span className="code-purple">function</span> <span className="code-blue">Day02</span>() {'{'}</p>
                <p><span className="code-muted">02</span> &nbsp; <span className="code-purple">return</span> (</p>
                <p><span className="code-muted">03</span> &nbsp;&nbsp; <span className="code-yellow">{'<h1>'}</span></p>
                <p><span className="code-muted">04</span> &nbsp;&nbsp;&nbsp; Keep building.</p>
                <p><span className="code-muted">05</span> &nbsp;&nbsp; <span className="code-yellow">{'</h1>'}</span></p>
                <p><span className="code-muted">06</span> &nbsp; )</p>
                <p><span className="code-muted">07</span> {'}'}</p>
              </div>

              <div className="code-footer">
                <span><span className="live-dot" /> All systems ready</span>
                <span>DAY_02</span>
              </div>
            </div>

            <div className="floating-note">
              <span className="floating-note-icon">✳</span>
              <div>
                <strong>Small steps.</strong>
                <span>Real progress.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Day 2 statistics">
          {day02Stats.map((stat) => (
            <article className="stat-card" key={stat.id}>
              <span className="stat-label">{stat.label}</span>
              <strong className="stat-value">{stat.value}</strong>
              <span className="stat-detail">{stat.detail}</span>
            </article>
          ))}
        </section>

        <section className="progress-section" aria-label="Learning progress">
          <div className="progress-copy">
            <div>
              <span className="section-kicker">YOUR PROGRESS</span>
              <h2>Keep the momentum</h2>
            </div>
            <strong>{progress}%</strong>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Completed topics"
            aria-valuenow={completedTopics}
            aria-valuemin={0}
            aria-valuemax={day02Topics.length}
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p>
            {completedTopics} of {day02Topics.length} topics marked completed.
            Update the statuses in day02Data.js as you progress.
          </p>
        </section>

        <section className="topics-section" id="topics">
          <div className="section-heading">
            <div>
              <span className="section-kicker">THE LEARNING PATH</span>
              <h2>Today's focus</h2>
              <p>Five concepts to strengthen your React foundation.</p>
            </div>
            <span className="topic-count">
              {day02Topics.length} TOPICS
            </span>
          </div>

          <div className="topics-grid">
            {day02Topics.map((topic) => (
              <TopicCard topic={topic} key={topic.id} />
            ))}
          </div>

          {day02Topics.length === 0 && (
            <div className="empty-state">
              <h3>No topics available yet</h3>
              <p>Add a topic to day02Data.js to see it here.</p>
            </div>
          )}
        </section>

        <footer className="dashboard-footer">
          <div className="footer-brand">
            <span className="brand-mark small">R</span>
            <span>ReactJourney</span>
          </div>
          <p>Learning in public. Building for the future.</p>
          <span className="footer-day">DAY 02 / 30</span>
        </footer>
      </div>
    </main>
  )
}

export default Day02
