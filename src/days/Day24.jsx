import { useMemo, useState } from "react"
import MetricCard from "../components/day24/MetricCard"
import TaskCard from "../components/day24/TaskCard"
import TaskModal from "../components/day24/TaskModal"
import ActivityFeed from "../components/day24/ActivityFeed"
import { initialTasks, columns, team, activities } from "../data/day24Data"
import "./Day24.css"

export default function Day24() {
  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All tasks")
  const [showModal, setShowModal] = useState(false)
  const [activeNav, setActiveNav] = useState("Overview")
  const [notice, setNotice] = useState("")

  const completed = tasks.filter(task => task.status === "Done").length
  const progress = Math.round((completed / Math.max(tasks.length, 1)) * 100)

  const visibleTasks = useMemo(() => tasks.filter(task => {
    const matchesSearch = `${task.title} ${task.project} ${task.tag} ${task.assignee}`.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "All tasks" || task.priority === filter
    return matchesSearch && matchesFilter
  }), [tasks, search, filter])

  function moveTask(id, status) {
    setTasks(current => current.map(task => task.id === id ? { ...task, status } : task))
    setNotice("Task status updated successfully")
    window.setTimeout(() => setNotice(""), 2200)
  }

  function deleteTask(id) {
    setTasks(current => current.filter(task => task.id !== id))
  }

  function createTask(data) {
    const colorMap = { Frontend: "blue", Backend: "green", Design: "purple", Testing: "orange", DevOps: "green", Documentation: "orange" }
    setTasks(current => [{ ...data, id: Date.now(), status: "To Do", color: colorMap[data.tag] || "blue" }, ...current])
    setShowModal(false)
    setNotice("New task added to your workspace")
    window.setTimeout(() => setNotice(""), 2200)
  }

  const navItems = [
    { section: "WORKSPACE", items: [{ icon: "▦", name: "Overview" }, { icon: "▤", name: "My tasks" }, { icon: "◫", name: "Projects" }, { icon: "◷", name: "Timeline" }] },
    { section: "MANAGEMENT", items: [{ icon: "♧", name: "Team" }, { icon: "▥", name: "Reports" }] }
  ]

  return (
    <main className="opstrack">
      <aside className="sidebar">
        <a className="brand" href="#overview"><span className="brand-mark">O</span><span>ops<span>track</span></span></a>
        <div className="workspace-switch"><span className="workspace-symbol">N</span><div><small>WORKSPACE</small><strong>Northstar Labs</strong></div><span className="switch-arrow">⌄</span></div>
        <nav className="side-navigation">
          {navItems.map(group => <div className="nav-group" key={group.section}>
            <span className="nav-section">{group.section}</span>
            {group.items.map(item => <button key={item.name} className={`nav-link ${activeNav === item.name ? "active" : ""}`} onClick={() => setActiveNav(item.name)}><span>{item.icon}</span>{item.name}{item.name === "My tasks" && <i>4</i>}</button>)}
          </div>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card"><span className="upgrade-icon">✳</span><strong>Make work flow.</strong><p>Keep your team aligned and ship with confidence.</p><button onClick={() => setNotice("You're already using the demo workspace.")}>Explore workspace ↗</button></div>
          <div className="profile-row"><span className="avatar avatar-blue">UE</span><div><strong>Usman Elahi</strong><small>Workspace admin</small></div><span className="profile-dots">···</span></div>
        </div>
      </aside>

      <section className="main-area" id="overview">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <span className="system-status"><i /> All systems operational</span>
            <button className="icon-button" aria-label="Notifications" onClick={() => setNotice("You're all caught up!")}>♧<i /></button>
            <span className="top-avatar">UE</span>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row">
            <div><span className="eyebrow"><i /> MONDAY, NOVEMBER 16, 2026</span><h1>Good evening, Usman<span>.</span></h1><p>Here's what's happening across your engineering workspace.</p></div>
            <button className="btn-primary create-button" onClick={() => setShowModal(true)}>＋ Create task</button>
          </section>

          <section className="metrics-grid">
            <MetricCard label="Total tasks" value={tasks.length} change="+12.5%" icon="▤" tone="blue" detail="Across all active projects" />
            <MetricCard label="Completed" value={completed} change={`${progress}%`} icon="✓" tone="lime" detail="Of all workspace tasks" />
            <MetricCard label="In progress" value={tasks.filter(t => t.status === "In Progress").length} change="Active" icon="◷" tone="violet" detail="Currently being worked on" />
            <MetricCard label="In review" value={tasks.filter(t => t.status === "Review").length} change="Needs attention" icon="◎" tone="orange" detail="Waiting for team review" />
          </section>

          <section className="board-section">
            <div className="section-heading">
              <div><span className="eyebrow">DELIVERY PIPELINE</span><h2>Task board <span className="count-pill">{tasks.length}</span></h2><p>Track work from idea to delivery.</p></div>
              <div className="board-tools">
                <div className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." /></div>
                <select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)}><option>All tasks</option><option>High</option><option>Medium</option><option>Low</option></select>
              </div>
            </div>

            <div className="kanban-board">
              {columns.map((column, index) => {
                const columnTasks = visibleTasks.filter(task => task.status === column)
                return <section className={`kanban-column column-${index}`} key={column}>
                  <div className="column-heading"><div><span className="column-indicator" /><h3>{column}</h3><span className="column-count">{columnTasks.length}</span></div><button onClick={() => setShowModal(true)}>＋</button></div>
                  <div className="task-stack">
                    {columnTasks.map(task => <TaskCard key={task.id} task={task} onMove={moveTask} onDelete={deleteTask} />)}
                    {columnTasks.length === 0 && <div className="empty-column">No tasks here yet</div>}
                  </div>
                  <button className="add-task-link" onClick={() => setShowModal(true)}>＋ Add a task</button>
                </section>
              })}
            </div>
          </section>

          <section className="lower-grid">
            <div className="panel team-panel">
              <div className="panel-heading"><div><span className="eyebrow">PEOPLE & CAPACITY</span><h2>Team workload</h2></div><button onClick={() => setActiveNav("Team")}>View team ↗</button></div>
              <div className="team-list">
                {team.map(member => <div className="team-member" key={member.initials}><span className={`avatar avatar-${member.color}`}>{member.initials}</span><div className="member-info"><strong>{member.name}</strong><small>{member.role}</small></div><div className="member-progress"><div><span>{member.completed}/{member.tasks} tasks</span><b>{Math.round(member.completed / member.tasks * 100)}%</b></div><div className="progress-track"><i style={{ width: `${member.completed / member.tasks * 100}%` }} /></div></div></div>)}
              </div>
            </div>
            <div className="panel sprint-panel">
              <div className="panel-heading"><div><span className="eyebrow">SPRINT 08 · NOV 10–24</span><h2>Sprint progress</h2></div><span className="sprint-live"><i /> LIVE</span></div>
              <div className="sprint-score"><strong>{progress}<small>%</small></strong><span>overall completion</span></div>
              <div className="sprint-track"><i style={{ width: `${progress}%` }} /></div>
              <div className="sprint-stats"><div><strong>{completed}</strong><span>Completed</span></div><div><strong>{tasks.length - completed}</strong><span>Remaining</span></div><div><strong>8d</strong><span>Time left</span></div></div>
              <div className="sprint-note"><span>↗</span> Keep the momentum going. Your team is making progress.</div>
            </div>
          </section>

          <section className="panel activity-panel">
            <div className="panel-heading"><div><span className="eyebrow">TEAM PULSE</span><h2>Recent activity</h2></div><button onClick={() => setNotice("Showing the latest workspace activity.")}>View all activity ↗</button></div>
            <ActivityFeed activities={activities} />
          </section>
          <footer className="dashboard-footer"><span>© 2026 OPSTRACK</span><span>BUILT FOR TEAMS THAT SHIP.</span><span>v1.0.0 <i /> All systems normal</span></footer>
        </div>
      </section>

      {showModal && <TaskModal onClose={() => setShowModal(false)} onCreate={createTask} />}
      {notice && <div className="toast-message">✓ {notice}</div>}
    </main>
  )
}
