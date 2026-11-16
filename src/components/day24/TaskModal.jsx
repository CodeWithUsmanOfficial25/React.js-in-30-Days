import { useState } from "react"

export default function TaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("")
  const [project, setProject] = useState("Core Platform")
  const [priority, setPriority] = useState("Medium")
  const [tag, setTag] = useState("Frontend")
  const [assignee, setAssignee] = useState("AM")
  const [due, setDue] = useState("Nov 24")

  function submit(event) {
    event.preventDefault()
    if (!title.trim()) return
    onCreate({ title: title.trim(), project, priority, tag, assignee, due })
  }

  return (
    <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <form className="task-modal" onSubmit={submit}>
        <div className="modal-heading">
          <div>
            <span className="eyebrow">WORKSPACE / TASKS</span>
            <h2>Create a task</h2>
            <p>Add a new item to your engineering workflow.</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <label>Task title<input autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" required /></label>
        <div className="form-grid">
          <label>Project<select value={project} onChange={e => setProject(e.target.value)}><option>Core Platform</option><option>Web Experience</option><option>Analytics Suite</option><option>Infrastructure</option></select></label>
          <label>Priority<select value={priority} onChange={e => setPriority(e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <label>Category<select value={tag} onChange={e => setTag(e.target.value)}><option>Frontend</option><option>Backend</option><option>Design</option><option>Testing</option><option>DevOps</option><option>Documentation</option></select></label>
          <label>Assignee<select value={assignee} onChange={e => setAssignee(e.target.value)}><option value="AM">Alex Morgan</option><option value="SK">Sarah Kim</option><option value="HR">Hamza Raza</option><option value="JD">James Davis</option></select></label>
        </div>
        <label>Due date<input value={due} onChange={e => setDue(e.target.value)} placeholder="e.g. Nov 24" /></label>
        <div className="modal-actions">
          <button type="button" className="btn-quiet" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Create task <span>↗</span></button>
        </div>
      </form>
    </div>
  )
}
