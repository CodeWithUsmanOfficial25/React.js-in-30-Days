import { useEffect, useRef, useState } from "react";
import { initialTasks, timerModes } from "../data/day06Data";
import FocusTask from "../components/day06/FocusTask";
import "./Day06.css";

function Day06() {
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(timerModes.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [sessions, setSessions] = useState(0);
  const [newTask, setNewTask] = useState("");
  const [notice, setNotice] = useState("");

  const deadlineRef = useRef(null);
  const duration = timerModes[mode].minutes * 60;
  const completedTasks = tasks.filter((task) => task.done).length;
  const progress = duration > 0
    ? Math.min(100, Math.max(0, ((duration - secondsLeft) / duration) * 100))
    : 0;

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  useEffect(() => {
    if (!isRunning) return undefined;

    // Deadline use karne se delayed interval ki wajah se timer drift kam hota hai.
    deadlineRef.current = Date.now() + secondsLeft * 1000;

    const intervalId = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((deadlineRef.current - Date.now()) / 1000)
      );

      setSecondsLeft(remaining);

      if (remaining === 0) {
        setIsRunning(false);

        if (mode === "focus") {
          setSessions((current) => current + 1);
        }

        setNotice(
          mode === "focus"
            ? "Focus session complete! Time for a little break. 🎉"
            : "Break finished. Ready to focus again? ✨"
        );
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [isRunning, mode, secondsLeft === 0]);

  function selectMode(nextMode) {
    setIsRunning(false);
    setMode(nextMode);
    setSecondsLeft(timerModes[nextMode].minutes * 60);
    setNotice("");
  }

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(timerModes[mode].minutes * 60);
    setNotice("");
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  }

  function addTask(event) {
    event.preventDefault();
    const title = newTask.trim();

    if (!title) {
      setNotice("Add a task name first.");
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Math.max(0, ...currentTasks.map((task) => task.id)) + 1,
        title,
        category: "BUILD",
        done: false,
      },
    ]);

    setNewTask("");
    setNotice("Task added. One step closer! ✨");
  }

  return (
    <main className="focus-page">
      <header className="focus-header">
        <a className="focus-brand" href="#top" aria-label="FocusFlow home">
          <span className="focus-brand__symbol">✳</span>
          <span>focusflow<span className="focus-brand__period">.</span></span>
        </a>

        <span className="focus-day">REACT JOURNEY / DAY 06</span>
      </header>

      <section className="focus-hero" id="top">
        <div className="focus-hero__copy">
          <span className="focus-kicker">
            <span className="focus-kicker__star">✦</span>
            MAKE SPACE FOR YOUR BEST WORK
          </span>

          <h1>
            One thing
            <br />
            at a <span>time.</span>
          </h1>

          <p>
            Less switching, more creating. Give one task your full attention,
            then take a proper break. Your future self says thanks.
          </p>

          <a href="#timer" className="focus-hero__link">
            Find your focus <span>↘</span>
          </a>
        </div>

        <div className="focus-art" aria-label="Abstract colorful focus illustration">
          <div className="focus-art__ring focus-art__ring--outer" />
          <div className="focus-art__ring focus-art__ring--inner" />
          <div className="focus-art__sun">✳</div>
          <div className="focus-art__orb focus-art__orb--orange" />
          <div className="focus-art__orb focus-art__orb--green" />
          <span className="focus-art__label">LESS NOISE. MORE YOU.</span>
          <span className="focus-art__spark focus-art__spark--one">✦</span>
          <span className="focus-art__spark focus-art__spark--two">✳</span>
        </div>
      </section>

      <section className="focus-workspace" id="timer">
        <div className="timer-panel">
          <div className="panel-heading">
            <span className="focus-kicker">YOUR FOCUS SPACE</span>
            <span className="live-indicator">
              <span /> {isRunning ? "IN SESSION" : "READY WHEN YOU ARE"}
            </span>
          </div>

          <div className="timer-modes" aria-label="Timer mode">
            {Object.entries(timerModes).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={`timer-mode ${mode === key ? "timer-mode--active" : ""}`}
                onClick={() => selectMode(key)}
                aria-pressed={mode === key}
              >
                <span>{item.emoji}</span> {item.label}
              </button>
            ))}
          </div>

          <div
            className={`timer-face timer-face--${mode}`}
            role="timer"
            aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
          >
            <svg className="timer-ring" viewBox="0 0 260 260" aria-hidden="true">
              <circle className="timer-ring__track" cx="130" cy="130" r="116" />
              <circle
                className="timer-ring__progress"
                cx="130"
                cy="130"
                r="116"
                strokeDasharray={2 * Math.PI * 116}
                strokeDashoffset={(2 * Math.PI * 116) * (1 - progress / 100)}
              />
            </svg>

            <div className="timer-face__content">
              <span className="timer-face__emoji">{timerModes[mode].emoji}</span>
              <strong>{minutes}:{seconds}</strong>
              <span className="timer-face__caption">{timerModes[mode].label}</span>
            </div>
          </div>

          <div className="timer-actions">
            <button
              type="button"
              className="timer-start"
              onClick={() => {
                setNotice("");
                setIsRunning((running) => !running);
              }}
            >
              {isRunning ? "Ⅱ  Pause focus" : secondsLeft === 0 ? "↻  Start again" : "▶  Start focusing"}
            </button>

            <button
              type="button"
              className="timer-reset"
              onClick={resetTimer}
              aria-label="Reset timer"
            >
              ↻
            </button>
          </div>

          <p className="timer-tip">
            {mode === "focus"
              ? "Put distractions away. You've got this."
              : "Stretch, breathe, and let your brain recharge."}
          </p>

          {notice && (
            <p className="focus-notice" role="status">
              {notice}
            </p>
          )}
        </div>

        <aside className="focus-side">
          <section className="session-card">
            <span className="session-card__icon">🏁</span>
            <span className="focus-kicker">TODAY'S MOMENTUM</span>
            <strong>{sessions.toString().padStart(2, "0")}</strong>
            <p>Focus sessions completed</p>
            <div className="session-dots" aria-label={`${sessions} completed focus sessions`}>
              {Array.from({ length: Math.min(8, Math.max(4, sessions)) }, (_, index) => (
                <span
                  key={index}
                  className={index < sessions ? "session-dots__item session-dots__item--done" : "session-dots__item"}
                >
                  {index < sessions ? "✦" : ""}
                </span>
              ))}
            </div>
          </section>

          <section className="tasks-panel">
            <div className="tasks-panel__heading">
              <div>
                <span className="focus-kicker">YOUR NEXT MOVES</span>
                <h2>Little to-do list<span> ✳</span></h2>
              </div>
              <span className="task-count">{completedTasks}/{tasks.length}</span>
            </div>

            <div className="task-progress">
              <div
                className="task-progress__fill"
                style={{ width: `${tasks.length ? (completedTasks / tasks.length) * 100 : 0}%` }}
              />
            </div>

            <div className="focus-task-list">
              {tasks.map((task) => (
                <FocusTask key={task.id} task={task} onToggle={toggleTask} />
              ))}
            </div>

            <form className="task-add" onSubmit={addTask}>
              <label className="sr-only" htmlFor="new-focus-task">New task</label>
              <input
                id="new-focus-task"
                type="text"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="Add a tiny goal..."
                maxLength={80}
              />
              <button type="submit" aria-label="Add task">+</button>
            </form>
          </section>
        </aside>
      </section>

      <section className="focus-quote">
        <span className="focus-quote__mark">“</span>
        <p>Progress is built one focused minute at a time.</p>
        <span className="focus-quote__tag">SHOW UP. START SMALL. KEEP GOING.</span>
      </section>

      <footer className="focus-footer">
        <span>FOCUSFLOW ✳</span>
        <p>Made for your next little breakthrough.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}

export default Day06;
