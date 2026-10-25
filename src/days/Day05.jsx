import { useMemo, useState } from "react";
import { initialHabits, habitCategories } from "../data/day05Data";
import HabitCard from "../components/day05/HabitCard";
import StatsCard from "../components/day05/StatsCard";
import "./Day05.css";

function Day05() {
  const [habits, setHabits] = useState(initialHabits);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCompleted, setShowCompleted] = useState(false);

  const completedCount = habits.filter((habit) => habit.completed).length;
  const totalCount = habits.length;
  const progress = totalCount === 0
    ? 0
    : Math.round((completedCount / totalCount) * 100);

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesCategory =
        activeCategory === "All" || habit.category === activeCategory;

      const matchesStatus = !showCompleted || habit.completed;

      return matchesCategory && matchesStatus;
    });
  }, [habits, activeCategory, showCompleted]);

  function toggleHabit(habitId) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  }

  function resetHabits() {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => ({ ...habit, completed: false }))
    );
    setShowCompleted(false);
    setActiveCategory("All");
  }

  return (
    <main className="habit-page">
      <header className="habit-header">
        <a className="habit-brand" href="#home" aria-label="ColorPop home">
          <span className="habit-brand__icon">✳</span>
          <span>colorpop<span className="habit-brand__dot">.</span></span>
        </a>

        <span className="day-pill">REACT JOURNEY · DAY 05</span>
      </header>

      <section className="habit-hero" id="home">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow__dot" />
            YOUR LITTLE DAILY WINS
          </span>

          <h1>
            Small steps.
            <br />
            <span>Big sunshine.</span>
          </h1>

          <p>
            Good habits grow with consistency, not perfection.
            Show up for yourself and celebrate every little win.
          </p>

          <a className="hero-link" href="#habits">
            Let's make today count <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-art" aria-label="Illustration of a sunny day">
          <div className="sun-rays" />
          <div className="sun-disc">✦</div>
          <div className="art-cloud art-cloud--one" />
          <div className="art-cloud art-cloud--two" />
          <div className="art-hill art-hill--back" />
          <div className="art-hill art-hill--front" />
          <span className="art-spark art-spark--one">✳</span>
          <span className="art-spark art-spark--two">✦</span>
          <span className="art-caption">A FRESH START, EVERY DAY</span>
        </div>
      </section>

      <section className="daily-progress" aria-label="Daily habit progress">
        <div className="daily-progress__intro">
          <div>
            <span className="section-eyebrow">YOUR DAILY CHECK-IN</span>
            <h2>Look at you, growing!</h2>
          </div>
          <div className="progress-number">
            <strong>{progress}%</strong>
            <span>complete</span>
          </div>
        </div>

        <div
          className="progress-bar"
          role="progressbar"
          aria-label="Daily habit completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="progress-footer">
          <span>{completedCount} of {totalCount} habits completed</span>
          <span>
            {progress === 100
              ? "You did it! What a brilliant day! 🎉"
              : "Every little effort adds up ✨"}
          </span>
        </div>
      </section>

      <section className="stats-grid" aria-label="Habit statistics">
        <StatsCard
          emoji="🌱"
          label="Habits in your plan"
          value={totalCount}
          note="Your daily routine"
          color="mint"
        />
        <StatsCard
          emoji="🎯"
          label="Habits completed"
          value={completedCount}
          note="Look at your progress"
          color="rose"
        />
        <StatsCard
          emoji="⚡"
          label="Still to go"
          value={totalCount - completedCount}
          note="You've got this"
          color="sunshine"
        />
      </section>

      <section className="habits-section" id="habits">
        <div className="habits-heading">
          <div>
            <span className="section-eyebrow">YOUR ROUTINE, YOUR RULES</span>
            <h2>Today's habits <span>✳</span></h2>
            <p>Tap a habit when you've done it. Progress feels good!</p>
          </div>

          <button className="reset-button" type="button" onClick={resetHabits}>
            ↻ Reset day
          </button>
        </div>

        <div className="habit-controls">
          <div className="category-filters" aria-label="Filter by category">
            {habitCategories.map((category) => (
              <button
                type="button"
                key={category}
                className={`category-filter ${activeCategory === category ? "category-filter--active" : ""}`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="completed-filter">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(event) => setShowCompleted(event.target.checked)}
            />
            <span>Completed only</span>
          </label>
        </div>

        <div className="habits-grid">
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
              />
            ))
          ) : (
            <div className="habits-empty">
              <span>🌼</span>
              <h3>No habits here just yet</h3>
              <p>Try another category or complete a habit to see it here.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setShowCompleted(false);
                }}
              >
                Show all habits
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="habit-footer">
        <div className="footer-flower">✿</div>
        <p>Be kind to yourself. You're a work in progress.</p>
        <span>LEARN · GROW · GLOW</span>
      </footer>
    </main>
  );
}

export default Day05;
