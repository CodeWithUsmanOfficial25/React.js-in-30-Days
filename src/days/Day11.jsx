import { useMemo, useState } from "react";
import { initialEntries, moodOptions, getMood } from "../data/day11Data";
import MoodOption from "../components/day11/MoodOption";
import MoodEntry from "../components/day11/MoodEntry";
import "./Day11.css";

export default function Day11() {
  const [entries, setEntries] = useState(initialEntries);
  const [selectedMood, setSelectedMood] = useState("happy");
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const selectedMoodInfo = getMood(selectedMood);

  const moodCounts = useMemo(() => {
    return moodOptions.map((mood) => ({
      ...mood,
      count: entries.filter((entry) => entry.mood === mood.id).length
    }));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => filter === "all" || entry.mood === filter);
  }, [entries, filter]);

  const todayEntry = entries.find((entry) => entry.date === today);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const saveEntry = (event) => {
    event.preventDefault();

    if (!note.trim()) {
      showNotice("Write a little about your day first.");
      return;
    }

    const now = new Date();
    const createdAt = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });

    setEntries((current) => [
      {
        id: Date.now(),
        mood: selectedMood,
        note: note.trim(),
        date: today,
        createdAt
      },
      ...current.filter((entry) => entry.date !== today)
    ]);

    setNote("");
    showNotice("Your mood entry has been saved!");
  };

  const deleteEntry = (id) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
    showNotice("Journal entry deleted.");
  };

  const resetJournal = () => {
    setEntries(initialEntries);
    setFilter("all");
    setSelectedMood("happy");
    setNote("");
    showNotice("Demo journal restored.");
  };

  const averageMood = entries.length
    ? Math.round(entries.reduce((total, entry) => {
        const scores = { happy: 4, calm: 3, neutral: 2, sad: 1 };
        return total + scores[entry.mood];
      }, 0) / entries.length * 25)
    : 0;

  return (
    <main className="mood-app">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <div className="ambient ambient-three"></div>

      <header className="mood-header glass-panel">
        <a className="mood-brand" href="#home">
          <span className="brand-icon">✳</span>
          moodcanvas<span className="brand-period">.</span>
        </a>
        <nav>
          <a href="#checkin">Daily check-in</a>
          <a href="#history">Your journal</a>
        </nav>
        <div className="header-label"><span></span> YOUR PRIVATE SPACE</div>
      </header>

      <section className="welcome-section" id="home">
        <div className="welcome-copy">
          <span className="welcome-tag">A MOMENT FOR YOURSELF</span>
          <h1>Every feeling<br />has a <em>place.</em></h1>
          <p>Slow down, check in with yourself, and give your feelings a little space. No judgment. Just you.</p>
          <a href="#checkin" className="start-link">Check in with yourself <span>↗</span></a>
        </div>
        <div className="welcome-art">
          <div className="art-orbit orbit-one"></div>
          <div className="art-orbit orbit-two"></div>
          <div className="art-center">☁️</div>
          <span className="floating-emoji float-one">✨</span>
          <span className="floating-emoji float-two">🌷</span>
          <span className="floating-emoji float-three">☀️</span>
          <div className="art-caption glass-panel">Breathe in. Breathe out.</div>
        </div>
      </section>

      <section className="overview-grid">
        <article className="overview-card glass-panel">
          <span className="overview-icon">📖</span>
          <div><strong>{entries.length}</strong><small>Journal entries</small></div>
        </article>
        <article className="overview-card glass-panel">
          <span className="overview-icon">🌈</span>
          <div><strong>{moodOptions.filter((mood) => entries.some((entry) => entry.mood === mood.id)).length}</strong><small>Moods explored</small></div>
        </article>
        <article className="overview-card glass-panel">
          <span className="overview-icon">💜</span>
          <div><strong>{averageMood}%</strong><small>Mood balance score</small></div>
        </article>
      </section>

      <section className="checkin-section glass-panel" id="checkin">
        <div className="section-topline">
          <div><span className="section-kicker">DAILY REFLECTION</span><h2>How are you <em>feeling?</em></h2></div>
          <span className="today-pill">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
        </div>

        {todayEntry && (
          <div className="today-notice">
            You already checked in today. Saving a new mood will replace today's entry.
          </div>
        )}

        <div className="mood-options">
          {moodOptions.map((mood) => (
            <MoodOption key={mood.id} mood={mood} selected={selectedMood === mood.id} onSelect={setSelectedMood} />
          ))}
        </div>

        <form className="journal-form" onSubmit={saveEntry}>
          <div className="selected-mood-label">
            <span style={{ background: selectedMoodInfo.color }}>{selectedMoodInfo.emoji}</span>
            <div><strong>{selectedMoodInfo.label}</strong><small>{selectedMoodInfo.description}</small></div>
          </div>
          <label htmlFor="mood-note">What's on your mind?</label>
          <textarea id="mood-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write anything you'd like to remember about today..." maxLength={500} rows={4} />
          <div className="form-footer"><span>{note.length}/500 characters</span><button type="submit">Save today's mood <span>↗</span></button></div>
        </form>
      </section>

      <section className="history-section" id="history">
        <div className="history-heading">
          <div><span className="section-kicker">LOOKING BACK</span><h2>Your mood <em>journal.</em></h2></div>
          <button className="reset-journal" onClick={resetJournal}>Reset demo</button>
        </div>

        <div className="mood-summary-grid">
          {moodCounts.map((mood) => (
            <button key={mood.id} className={`summary-mood glass-panel ${filter === mood.id ? "summary-active" : ""}`} onClick={() => setFilter(filter === mood.id ? "all" : mood.id)}>
              <span className="summary-emoji" style={{ background: `${mood.color}55` }}>{mood.emoji}</span>
              <span><strong>{mood.count}</strong><small>{mood.label}</small></span>
            </button>
          ))}
        </div>

        <div className="history-toolbar">
          <div><h3>Recent entries</h3><span>{filteredEntries.length} moments captured</span></div>
          <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter journal entries">
            <option value="all">All moods</option>
            {moodOptions.map((mood) => <option key={mood.id} value={mood.id}>{mood.label}</option>)}
          </select>
        </div>

        <div className="entries-list">
          {filteredEntries.length ? filteredEntries.map((entry) => (
            <MoodEntry key={entry.id} entry={entry} onDelete={deleteEntry} />
          )) : (
            <div className="history-empty glass-panel"><span>🌱</span><h3>No moments here yet</h3><p>Choose another mood filter or add a new journal entry.</p><button onClick={() => setFilter("all")}>Show all entries</button></div>
          )}
        </div>
      </section>

      <footer className="mood-footer">
        <a className="mood-brand" href="#home"><span className="brand-icon">✳</span> moodcanvas<span className="brand-period">.</span></a>
        <p>Be gentle with yourself. You're doing just fine.</p>
        <span>DAY 11 · REACT.JS IN 30 DAYS</span>
      </footer>

      {notice && <div className="mood-toast">{notice}</div>}
    </main>
  );
}