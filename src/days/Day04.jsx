
import { useMemo, useState } from "react";
import { initialTasks, studyTopics } from "../data/day04Data";
import FormField from "../components/day04/FormField";
import TaskCard from "../components/day04/TaskCard";
import "./Day04.css";

function Day04() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState(studyTopics[0]);
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = useMemo(() => {
    if (filter === "Completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "Pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Please enter a task title before adding it.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: cleanTitle,
      topic,
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setTitle("");
    setPriority("Medium");
    setError("");
    setFilter("All");
  }

  function handleToggle(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <main className="study-planner">
      <header className="planner-header">
        <div className="brand-mark">S.</div>

        <div className="header-label">
          <span>YOUR LEARNING SPACE</span>
          <p>React.js in 30 Days</p>
        </div>

        <span className="day-label">DAY 04 / 30</span>
      </header>

      <section className="welcome-section">
        <p className="eyebrow">A LITTLE PROGRESS EVERY DAY</p>
        <h1>Make room for<br />what <em>matters.</em></h1>
        <p className="welcome-copy">
          Plan your learning, keep track of your tasks, and
          celebrate the small wins along the way.
        </p>
      </section>

      <section className="progress-panel" aria-label="Study progress">
        <div className="progress-heading">
          <div>
            <span className="section-kicker">YOUR PROGRESS</span>
            <h2>{completedCount} of {tasks.length} tasks completed</h2>
          </div>

          <strong>{progress}%</strong>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Task completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="progress-note">
          {progress === 100
            ? "Lovely work. You completed every task!"
            : "Keep going. Every completed task counts."}
        </p>
      </section>

      <div className="planner-layout">
        <section className="create-panel">
          <div className="panel-heading">
            <span className="section-kicker">PLAN YOUR SESSION</span>
            <h2>Add a task</h2>
            <p>Give your next learning session a clear purpose.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              label="Task title"
              id="task-title"
              type="text"
              placeholder="e.g. Build a React component"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) setError("");
              }}
              maxLength={100}
            />

            <div className="form-field">
              <label htmlFor="task-topic">Learning topic</label>
              <select
                id="task-topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              >
                {studyTopics.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button className="add-task-button" type="submit">
              <span>+</span> Add to my plan
            </button>
          </form>

          <p className="form-footnote">
            Start small. Stay consistent.
          </p>
        </section>

        <section className="tasks-panel">
          <div className="tasks-heading">
            <div>
              <span className="section-kicker">YOUR CHECKLIST</span>
              <h2>Study tasks</h2>
            </div>

            <span className="task-count">
              {tasks.length.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="task-filters" aria-label="Filter study tasks">
            {["All", "Pending", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "filter-button active" : "filter-button"}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="task-list">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                />
              ))
            ) : (
              <div className="empty-state">
                <span className="empty-icon">✳</span>
                <h3>Nothing on this list yet</h3>
                <p>
                  {filter === "Completed"
                    ? "Complete a task and it will appear here."
                    : "Add a task or choose another filter."}
                </p>
              </div>
            )}
          </div>

          <p className="list-footer">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
        </section>
      </div>

      <footer className="planner-footer">
        <p>Made with patience, one component at a time.</p>
        <span>LEARN · BUILD · REPEAT</span>
      </footer>
    </main>
  );
}

export default Day04;
