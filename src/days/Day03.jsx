
import { useState } from 'react'
import './Day03.css'
import { day03Stats, day03Topics } from '../data/day03Data.js'
import TopicCard from '../components/day03/TopicCard.jsx'

function Day03() {
  const [topics, setTopics] = useState(day03Topics)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  // Completed topics ki tadaad state se calculate hoti hai.
  const completedCount = topics.filter(
    (topic) => topic.status === 'Completed'
  ).length

  const progress = Math.round(
    (completedCount / topics.length) * 100
  )

  // Search aur selected filter dono results par apply hote hain.
  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = `${topic.title} ${topic.category} ${topic.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesFilter =
      activeFilter === 'All' || topic.status === activeFilter

    return matchesSearch && matchesFilter
  })

  function toggleTopicStatus(topicId) {
    // Sirf selected topic update hota hai; baqi data same rehta hai.
    setTopics((currentTopics) =>
      currentTopics.map((topic) => {
        if (topic.id !== topicId) {
          return topic
        }

        return {
          ...topic,
          status:
            topic.status === 'Completed'
              ? 'Practicing'
              : 'Completed',
        }
      })
    )
  }

  function resetProgress() {
    // Reset button original Day 3 statuses wapas laata hai.
    setTopics(day03Topics)
    setSearchTerm('')
    setActiveFilter('All')
  }

  const filters = ['All', 'Practicing', 'Upcoming', 'Completed']

  return (
    <main className="day03-app">
      <div className="day03-shell">
        <header className="day03-header">
          <a className="day03-brand" href="#top" aria-label="React Journey home">
            <span className="day03-brand-icon">R</span>
            <span>React<span className="day03-brand-light">Journey</span></span>
          </a>

          <span className="day03-challenge">
            <span className="day03-live-dot" />
            30-Day Challenge
          </span>
        </header>

        <section className="day03-hero" id="top">
          <div className="day03-hero-copy">
            <span className="day03-eyebrow">
              <span />
              DAY 03 · INTERACTIVE REACT
            </span>

            <h1>
              Make it
              <br />
              <span>interactive.</span>
            </h1>

            <p>
              Learn how React responds to users. Explore state, props,
              and events while tracking your own progress.
            </p>

            <a className="day03-primary-link" href="#learning-path">
              Explore the topics <span>↘</span>
            </a>
          </div>

          <div className="day03-code-panel">
            <div className="day03-code-heading">
              <div className="day03-window-dots">
                <span />
                <span />
                <span />
              </div>
              <span>Day03.jsx</span>
              <span className="day03-file-type">REACT</span>
            </div>

            <div className="day03-code-content">
              <p><span>01</span> <b>const</b> [count, setCount] =</p>
              <p><span>02</span> &nbsp; <b>useState</b>(0)</p>
              <p><span>03</span></p>
              <p><span>04</span> <b>function</b> handleClick() {'{'}</p>
              <p><span>05</span> &nbsp; setCount(count + 1)</p>
              <p><span>06</span> {'}'}</p>
              <p><span>07</span></p>
              <p><span>08</span> <i>Keep experimenting.</i></p>
            </div>

            <div className="day03-code-footer">
              <span className="day03-live-dot" />
              State changes. UI updates.
            </div>

            <div className="day03-floating-note">
              <span>↗</span>
              <div>
                <strong>Small steps.</strong>
                <p>Real progress.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="day03-stats" aria-label="Day 3 statistics">
          {day03Stats.map((stat) => (
            <article className="day03-stat-card" key={stat.id}>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="day03-progress-panel">
          <div className="day03-progress-top">
            <div>
              <span className="day03-eyebrow">YOUR PROGRESS</span>
              <h2>Build your momentum</h2>
            </div>
            <strong className="day03-progress-value">{progress}%</strong>
          </div>

          <div
            className="day03-progress-track"
            role="progressbar"
            aria-label="Completed topics"
            aria-valuemin={0}
            aria-valuemax={topics.length}
            aria-valuenow={completedCount}
          >
            <div style={{ width: `${progress}%` }} />
          </div>

          <p>
            {completedCount} of {topics.length} topics completed.
            Your progress updates as you mark topics complete.
          </p>
        </section>

        <section className="day03-learning" id="learning-path">
          <div className="day03-section-heading">
            <div>
              <span className="day03-eyebrow">THE LEARNING PATH</span>
              <h2>Today's focus</h2>
              <p>Explore the concepts behind interactive React apps.</p>
            </div>

            <span className="day03-topic-count">
              {filteredTopics.length} TOPICS
            </span>
          </div>

          <div className="day03-controls">
            <label className="day03-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search topics..."
                aria-label="Search topics"
              />
            </label>

            <div className="day03-filters" aria-label="Filter topics">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    activeFilter === filter ? 'active' : ''
                  }
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredTopics.length > 0 ? (
            <div className="day03-topic-grid">
              {filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onToggleStatus={toggleTopicStatus}
                />
              ))}
            </div>
          ) : (
            <div className="day03-empty-state">
              <span>⌕</span>
              <h3>No topics found</h3>
              <p>Try another search or select a different filter.</p>
              <button type="button" onClick={resetProgress}>
                Reset view
              </button>
            </div>
          )}

          <div className="day03-bottom-actions">
            <p>Keep going. Every concept makes you a stronger developer.</p>
            <button type="button" onClick={resetProgress}>
              Reset progress ↺
            </button>
          </div>
        </section>

        <footer className="day03-footer">
          <a className="day03-brand" href="#top">
            <span className="day03-brand-icon">R</span>
            <span>React<span className="day03-brand-light">Journey</span></span>
          </a>

          <p>Learning in public. Building for the future.</p>
          <span className="day03-footer-day">DAY 03 / 30</span>
        </footer>
      </div>
    </main>
  )
}

export default Day03
