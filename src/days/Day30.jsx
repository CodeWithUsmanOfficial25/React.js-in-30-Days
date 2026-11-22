import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { EmptyState, MetricCard, Modal, PageHeading, Panel, SearchBox, StatusPill } from "../components/UI";
import { WorkspaceProvider, useWorkspace } from "../context/WorkspaceContext";
import { useWorkspaceActions, useWorkspaceSearch } from "../hooks/useWorkspaceTools";
import "./Day30.css";

const ToastContext = createContext(() => {});
function useToast() { return useContext(ToastContext); }

function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const show = React.useCallback(text => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2600);
  }, []);
  return <ToastContext.Provider value={show}>{children}{message && <div className="toast">✦ {message}</div>}</ToastContext.Provider>;
}

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useWorkspace();
  const toast = useToast();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const unread = state.notifications.filter(item => !item.read).length;
  const globalResults = useMemo(() => {
    const term = globalSearch.toLowerCase().trim();
    if (!term) return [];
    return [
      ...state.projects.filter(item => item.name.toLowerCase().includes(term)).map(item => ({ name: item.name, path: "/projects", type: "Project" })),
      ...state.leads.filter(item => item.name.toLowerCase().includes(term)).map(item => ({ name: item.name, path: "/crm", type: "Lead" })),
      ...state.tasks.filter(item => item.title.toLowerCase().includes(term)).map(item => ({ name: item.title, path: "/projects", type: "Task" }))
    ].slice(0, 6);
  }, [globalSearch, state.projects, state.leads, state.tasks]);

  if (loading) return <div className="loading-screen"><div className="loading-logo">A</div><h2>AURORA OS</h2><div className="loading-track"><span /></div><p>Preparing your workspace experience...</p></div>;

  return <div className={`app-shell ${state.theme === "dark" ? "dark-mode" : ""}`}>
    <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
    {sidebarOpen && <button className="mobile-scrim" onClick={() => setSidebarOpen(false)} />}
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button><span className="breadcrumb">Aurora Studio <b>/</b> <strong>{location.pathname === "/" ? "Command Center" : location.pathname.slice(1).replaceAll("-", " ")}</strong></span></div><div className="topbar-actions"><button className="top-search" onClick={() => setSearchOpen(!searchOpen)}><span>⌕</span> Search workspace <kbd>⌘ K</kbd></button><button className="icon-button notification-button" onClick={() => { dispatch({ type: "MARK_READ" }); navigate("/"); toast("Notifications marked as read"); }}>♧{unread > 0 && <i>{unread}</i>}</button><button className="top-profile" onClick={() => navigate("/settings")}><span className="user-avatar">AM</span><span>{state.profile.name.split(" ")[0]}</span><b>⌄</b></button></div></header>
      {searchOpen && <div className="global-search-panel"><SearchBox value={globalSearch} onChange={setGlobalSearch} placeholder="Search projects, leads and tasks..." /><div className="global-results">{globalResults.length ? globalResults.map((result, index) => <button key={index} onClick={() => { navigate(result.path); setSearchOpen(false); }}><span>{result.type}</span>{result.name}<b>↗</b></button>) : <p>{globalSearch ? "No matching workspace items." : "Start typing to search your workspace."}</p>}</div></div>}
      <div className="page-content"><Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/team" element={<Team />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes></div>
      <footer className="app-footer"><span>✦ AURORA OS</span><span>Built for ambitious teams · Day 30 React Edition</span><span>All systems operational <i /></span></footer>
    </main>
  </div>;
}

function Overview() {
  const { state, dispatch } = useWorkspace();
  const navigate = useNavigate();
  const toast = useToast();
  const completed = state.tasks.filter(task => task.done).length;
  return <>
    <div className="hero-banner"><div className="hero-copy"><span className="hero-kicker"><i /> YOUR WORKSPACE, IN FULL COLOR</span><h1>Make room for<br /><em>extraordinary.</em></h1><p>Your ideas, people and progress—beautifully connected in one place.</p><div className="hero-actions"><button className="button-primary" onClick={() => navigate("/projects")}>Explore workspace <span>↗</span></button><button className="button-ghost" onClick={() => navigate("/analytics")}>View insights</button></div></div><div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-sphere sphere-main">✦</div><div className="hero-sphere sphere-small">✧</div><div className="floating-note note-one">↗ 24.8% <small>Growth</small></div><div className="floating-note note-two">✦ You're on track</div><div className="floating-ring" /></div><div className="hero-index">01 / 09</div></div>
    <div className="welcome-row"><div><span className="eyebrow">SUNDAY, NOVEMBER 22, 2026</span><h2>Good afternoon, {state.profile.name.split(" ")[0]} <span>✦</span></h2><p>Here's what's happening across your workspace today.</p></div><button className="button-soft" onClick={() => toast("Your workspace report is ready to explore.")}>↗ Export overview</button></div>
    <div className="metrics-grid"><MetricCard label="Total revenue" value="$48,290" change="+18.6%" note="vs last month" icon="↗" color="violet" /><MetricCard label="Active projects" value={state.projects.filter(p => p.status !== "Completed").length} change="+2 new" note="this month" icon="▦" color="blue" /><MetricCard label="Total customers" value="1,284" change="+12.4%" note="vs last month" icon="◎" color="orange" /><MetricCard label="Tasks completed" value={`${completed}/${state.tasks.length}`} change="+8.2%" note="completion rate" icon="✓" color="green" /></div>
    <div className="overview-grid"><Panel title="Business performance" subtitle="Revenue movement · Last 7 days" action={<button className="text-action" onClick={() => navigate("/analytics")}>Full report ↗</button>}><RevenueChart /></Panel><Panel title="Project pulse" subtitle="Your team's active work" action={<button className="text-action" onClick={() => navigate("/projects")}>All projects ↗</button>}><div className="project-pulse">{state.projects.slice(0, 4).map(project => <div className="pulse-item" key={project.id}><div className={`project-dot ${project.color}`} /><div className="pulse-info"><strong>{project.name}</strong><small>{project.category} · {project.due}</small></div><div className="mini-progress"><span style={{ width: `${project.progress}%` }} /></div><b>{project.progress}%</b></div>)}</div></Panel><Panel title="Priority tasks" subtitle="A little progress every day" action={<button className="text-action" onClick={() => navigate("/projects")}>Open tasks ↗</button>}><div className="task-list">{state.tasks.slice(0, 4).map(task => <label className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })} /><span className="custom-check">✓</span><span className="task-copy"><strong>{task.title}</strong><small>{task.owner}</small></span><span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span></label>)}</div></Panel><Panel title="Workspace activity" subtitle="A snapshot of what's moving"><div className="activity-list"><Activity icon="✦" color="violet" title="Aurora Rebrand progressed" detail="Olivia updated project progress · 10 min ago" /><Activity icon="◎" color="orange" title="A new lead joined" detail="Bloom Agency · 1 hour ago" /><Activity icon="✓" color="green" title="Task completed" detail="Mobile prototype review · 3 hours ago" /></div></Panel></div>
  </>;
}

function Activity({ icon, color, title, detail }) {
  return <div className="activity-item"><span className={`activity-icon ${color}`}>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><span className="activity-arrow">↗</span></div>;
}

function RevenueChart() {
  const points = "0,115 55,96 110,103 165,68 220,82 275,40 330,54 385,18";
  return <div className="chart-wrap"><div className="chart-legend"><strong>$48,290</strong><span><i /> Revenue</span><span><i className="legend-muted" /> Previous period</span></div><svg viewBox="0 0 400 150" preserveAspectRatio="none" className="revenue-chart"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#8c72f4" stopOpacity=".3" /><stop offset="100%" stopColor="#8c72f4" stopOpacity="0" /></linearGradient></defs><path d={`M${points.replaceAll(" ", " L")} L385,150 L0,150 Z`} fill="url(#chartFill)" /><polyline points={points} fill="none" stroke="#8c72f4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="chart-line" /><polyline points="0,130 55,120 110,125 165,108 220,116 275,91 330,98 385,84" fill="none" stroke="#d7d1e7" strokeWidth="2" strokeDasharray="5 6" /></svg><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div>;
}

function Analytics() {
  const [period, setPeriod] = useState("7 days");
  const [metric, setMetric] = useState("Revenue");
  const toast = useToast();
  const data = period === "30 days" ? [42, 55, 48, 70, 62, 86, 76, 94] : period === "90 days" ? [28, 40, 57, 49, 75, 68, 90, 100] : [35, 48, 42, 70, 58, 82, 74, 96];
  return <><PageHeading eyebrow="INTELLIGENCE / ANALYTICS" title="See the bigger picture." description="Turn business signals into your next big move." action={<button className="button-primary" onClick={() => toast("Analytics report prepared.")}>↓ Export report</button>} /><div className="filter-row"><div className="segmented">{["7 days", "30 days", "90 days"].map(item => <button className={period === item ? "selected" : ""} key={item} onClick={() => setPeriod(item)}>{item}</button>)}</div><select className="select-control" value={metric} onChange={e => setMetric(e.target.value)}><option>Revenue</option><option>Visitors</option><option>Conversions</option></select></div><div className="metrics-grid"><MetricCard label="Gross revenue" value="$48,290" change="+18.6%" note="compared to previous" icon="↗" color="violet" /><MetricCard label="Website visitors" value="24,891" change="+12.3%" note="compared to previous" icon="◉" color="blue" /><MetricCard label="Conversion rate" value="6.82%" change="+2.1%" note="compared to previous" icon="⌁" color="orange" /><MetricCard label="Avg. order value" value="$186.40" change="+8.4%" note="compared to previous" icon="◈" color="green" /></div><div className="analytics-layout"><Panel title={`${metric} overview`} subtitle={`Performance across ${period}`}><div className="big-chart"><div className="big-chart-value">{metric === "Revenue" ? "$48,290" : metric === "Visitors" ? "24,891" : "6.82%"}</div><div className="big-bars">{data.map((height, index) => <div className="bar-column" key={index}><span style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }} /><small>{["M", "T", "W", "T", "F", "S", "S", "M"][index]}</small></div>)}</div></div></Panel><Panel title="Channel performance" subtitle="Where your growth comes from"><div className="channel-list">{[["Organic search", 68, "#8c72f4"], ["Social media", 48, "#f18c67"], ["Direct traffic", 36, "#4fae91"], ["Referral", 22, "#69a5ed"]].map(([name, value, color]) => <div className="channel-row" key={name}><div><strong>{name}</strong><b>{value}%</b></div><div className="channel-track"><span style={{ width: `${value}%`, background: color }} /></div></div>)}</div></Panel><Panel title="Audience insights" subtitle="Your customer mix"><div className="audience-donut"><div className="donut"><span>1,284<small>Customers</small></span></div><div className="audience-legend"><p><i className="dot-violet" /> New customers <b>42%</b></p><p><i className="dot-orange" /> Returning <b>36%</b></p><p><i className="dot-green" /> Subscribers <b>22%</b></p></div></div></Panel><Panel title="Performance insights" subtitle="Highlights from this period"><div className="insight-card"><span>✦</span><div><strong>Strongest growth channel</strong><p>Organic search is leading your acquisition mix this period.</p></div></div><div className="insight-card"><span>↗</span><div><strong>Conversion momentum</strong><p>Your conversion rate has improved compared with the previous period.</p></div></div></Panel></div></>;
}

function Projects() {
  const { state, dispatch } = useWorkspace();
  const { addTask, addProject } = useWorkspaceActions(dispatch);
  const [view, setView] = useState("Board");
  const [modal, setModal] = useState("");
  const [filter, setFilter] = useState("All");
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const toast = useToast();
  const filtered = state.projects.filter(project => filter === "All" || project.status === filter);
  return <><PageHeading eyebrow="DELIVERY / PROJECT HUB" title="Ideas into impact." description="Plan, collaborate and move every project forward." action={<button className="button-primary" onClick={() => setModal("project")}>＋ New project</button>} /><div className="module-toolbar"><div className="segmented">{["Board", "List"].map(item => <button className={view === item ? "selected" : ""} key={item} onClick={() => setView(item)}>{item === "Board" ? "▦ " : "☷ "}{item}</button>)}</div><select className="select-control" value={filter} onChange={e => setFilter(e.target.value)}><option>All</option><option>In progress</option><option>Planning</option><option>Completed</option></select><button className="button-soft" onClick={() => setModal("task")}>＋ Add task</button></div>{view === "Board" ? <div className="kanban-grid">{["Planning", "In progress", "Completed"].map(status => <section className="kanban-column" key={status}><div className="kanban-title"><span className={`kanban-dot ${status.toLowerCase().replace(" ", "-")}`} />{status}<b>{filtered.filter(p => p.status === status).length}</b></div>{filtered.filter(p => p.status === status).map(project => <article className="kanban-card" key={project.id}><div className="kanban-card-top"><span className={`project-dot ${project.color}`} />{project.category}<button onClick={() => toast(`${project.name} project options`)}>•••</button></div><h3>{project.name}</h3><div className="kanban-card-bottom"><span>◷ {project.due}</span><span>{project.progress}%</span></div><div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div><div className="avatar-stack"><span>AM</span><span>OC</span><span>+2</span></div></article>)}{filtered.filter(p => p.status === status).length === 0 && <EmptyState icon="✦" title="Nothing here yet" detail="Projects will appear in this column." />}</section>)}</div> : <Panel title="Project directory" subtitle="All workspace projects"><div className="table-wrap"><table><thead><tr><th>PROJECT</th><th>CATEGORY</th><th>STATUS</th><th>PROGRESS</th><th>DUE DATE</th></tr></thead><tbody>{filtered.map(project => <tr key={project.id}><td><strong>{project.name}</strong></td><td>{project.category}</td><td><StatusPill>{project.status}</StatusPill></td><td>{project.progress}%</td><td>{project.due}</td></tr>)}</tbody></table></div></Panel>}{modal === "project" && <Modal title="Create a project" onClose={() => setModal("")}><form className="form-stack" onSubmit={e => { e.preventDefault(); if (!projectName.trim()) return; addProject({ name: projectName, category: "Product", due: "Dec 18" }); setProjectName(""); setModal(""); toast("New project created."); }}><label>Project name<input required value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="e.g. Next big idea" /></label><button className="button-primary">Create project ↗</button></form></Modal>}{modal === "task" && <Modal title="Add a task" onClose={() => setModal("")}><form className="form-stack" onSubmit={e => { e.preventDefault(); addTask({ title: taskTitle, owner: "Alex Morgan", priority: "Medium", project: "Aurora Rebrand" }); setTaskTitle(""); setModal(""); toast("Task added to your workspace."); }}><label>Task title<input required value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="What needs to get done?" /></label><button className="button-primary">Add task ↗</button></form></Modal>}</>;
}

function CRM() {
  const { state, dispatch } = useWorkspace();
  const { query, setQuery, results } = useWorkspaceSearch(state.leads, ["name", "email", "company", "stage"]);
  const [stage, setStage] = useState("All");
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const toast = useToast();
  const leads = results.filter(lead => stage === "All" || lead.stage === stage);
  return <><PageHeading eyebrow="RELATIONSHIPS / CRM SUITE" title="Every connection counts." description="Build stronger relationships and turn opportunities into partnerships." action={<button className="button-primary" onClick={() => setModal(true)}>＋ Add contact</button>} /><div className="metrics-grid"><MetricCard label="Total leads" value={state.leads.length} change="+14.8%" note="this month" icon="◎" color="violet" /><MetricCard label="Pipeline value" value={`$${state.leads.reduce((sum, lead) => sum + Number(lead.value), 0).toLocaleString()}`} change="+22.1%" note="potential revenue" icon="↗" color="green" /><MetricCard label="Qualified leads" value={state.leads.filter(l => l.stage === "Qualified").length} change="+3" note="this month" icon="✦" color="orange" /><MetricCard label="Conversion" value="18.4%" change="+4.2%" note="vs last month" icon="⌁" color="blue" /></div><Panel title="Relationship pipeline" subtitle="Manage your customer opportunities"><div className="crm-toolbar"><SearchBox value={query} onChange={setQuery} placeholder="Search contacts..." /><select className="select-control" value={stage} onChange={e => setStage(e.target.value)}>{["All", "New", "Qualified", "Proposal", "Negotiation"].map(x => <option key={x}>{x}</option>)}</select></div><div className="table-wrap"><table><thead><tr><th>CONTACT</th><th>COMPANY</th><th>DEAL VALUE</th><th>STAGE</th><th>UPDATE STAGE</th></tr></thead><tbody>{leads.map(lead => <tr key={lead.id}><td><div className="contact-cell"><span className="contact-avatar">{lead.avatar}</span><div><strong>{lead.name}</strong><small>{lead.email}</small></div></div></td><td>{lead.company}</td><td><strong>${Number(lead.value).toLocaleString()}</strong></td><td><StatusPill>{lead.stage}</StatusPill></td><td><select className="table-select" value={lead.stage} onChange={e => { dispatch({ type: "UPDATE_LEAD", payload: { id: lead.id, stage: e.target.value } }); toast("Lead stage updated."); }}>{["New", "Qualified", "Proposal", "Negotiation", "Won"].map(x => <option key={x}>{x}</option>)}</select></td></tr>)}</tbody></table>{leads.length === 0 && <EmptyState title="No contacts found" detail="Try another search or filter." />}</div></Panel>{modal && <Modal title="Add a new contact" onClose={() => setModal(false)}><form className="form-stack" onSubmit={e => { e.preventDefault(); dispatch({ type: "ADD_LEAD", payload: { name, email, company: name, value: Number(value) || 0, stage: "New" } }); setName(""); setEmail(""); setValue(""); setModal(false); toast("New contact added."); }}><label>Contact name<input required value={name} onChange={e => setName(e.target.value)} /></label><label>Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} /></label><label>Potential deal value ($)<input type="number" min="0" value={value} onChange={e => setValue(e.target.value)} /></label><button className="button-primary">Save contact ↗</button></form></Modal>}</>;
}

function Finance() {
  const { state, dispatch } = useWorkspace();
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Income");
  const toast = useToast();
  const income = state.transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = Math.abs(state.transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  return <><PageHeading eyebrow="OPERATIONS / FINANCE CENTER" title="Clarity in every number." description="Understand cash flow, monitor spending and make confident decisions." action={<button className="button-primary" onClick={() => setModal(true)}>＋ Add transaction</button>} /><div className="finance-hero"><div><span>AVAILABLE BALANCE</span><h2>${(income - expenses).toLocaleString("en-US")}.00</h2><p>↗ Your workspace is in a positive position</p></div><div className="finance-orb">◈</div><div className="finance-hero-bottom"><span>Income <b>${income.toLocaleString()}</b></span><span>Expenses <b>${expenses.toLocaleString()}</b></span><span>Net balance <b>${(income - expenses).toLocaleString()}</b></span></div></div><div className="metrics-grid"><MetricCard label="Total income" value={`$${income.toLocaleString()}`} change="+16.2%" note="this period" icon="↗" color="green" /><MetricCard label="Total expenses" value={`$${expenses.toLocaleString()}`} change="-4.8%" note="this period" icon="↘" color="orange" /><MetricCard label="Net profit" value={`$${(income - expenses).toLocaleString()}`} change="+21.4%" note="this period" icon="◈" color="violet" /><MetricCard label="Savings rate" value={`${Math.round((income - expenses) / Math.max(income, 1) * 100)}%`} change="+3.1%" note="this period" icon="✦" color="blue" /></div><Panel title="Recent transactions" subtitle="A live view of your financial activity"><div className="table-wrap"><table><thead><tr><th>DESCRIPTION</th><th>DATE</th><th>CATEGORY</th><th>AMOUNT</th></tr></thead><tbody>{state.transactions.map(t => <tr key={t.id}><td><div className="transaction-title"><span className={`transaction-icon ${t.color}`}>{t.amount > 0 ? "↙" : "↗"}</span><strong>{t.title}</strong></div></td><td>{t.date}</td><td><StatusPill>{t.category}</StatusPill></td><td className={t.amount > 0 ? "amount-positive" : "amount-negative"}>{t.amount > 0 ? "+" : "−"}${Math.abs(t.amount).toLocaleString()}</td></tr>)}</tbody></table></div></Panel>{modal && <Modal title="Record a transaction" onClose={() => setModal(false)}><form className="form-stack" onSubmit={e => { e.preventDefault(); dispatch({ type: "ADD_TRANSACTION", payload: { title, category, amount: (category === "Income" ? 1 : -1) * Number(amount), date: "Today", color: category === "Income" ? "green" : "orange" } }); setModal(false); setTitle(""); setAmount(""); toast("Transaction recorded."); }}><label>Description<input required value={title} onChange={e => setTitle(e.target.value)} /></label><label>Amount ($)<input type="number" min="1" required value={amount} onChange={e => setAmount(e.target.value)} /></label><label>Type<select value={category} onChange={e => setCategory(e.target.value)}><option>Income</option><option>Expense</option></select></label><button className="button-primary">Save transaction ↗</button></form></Modal>}</>;
}

function Team() {
  const [members, setMembers] = useState([{ name: "Olivia Chen", role: "Product Designer", status: "Online", initials: "OC", color: "violet" }, { name: "Noah Williams", role: "Lead Developer", status: "Online", initials: "NW", color: "blue" }, { name: "Mia Davis", role: "Marketing Lead", status: "Away", initials: "MD", color: "orange" }, { name: "Ethan Brooks", role: "UX Researcher", status: "Online", initials: "EB", color: "green" }, { name: "Sophia Lee", role: "Project Manager", status: "Offline", initials: "SL", color: "pink" }]);
  const [invite, setInvite] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast();
  return <><PageHeading eyebrow="RELATIONSHIPS / TEAM WORKSPACE" title="Great things, together." description="The people behind the progress. Keep your team connected." action={<button className="button-primary" onClick={() => setInvite(true)}>＋ Invite member</button>} /><div className="team-banner"><div><span>YOUR PEOPLE, YOUR POWER</span><h2>Better together.<br /><em>Always.</em></h2><p>Build a workspace where great work happens.</p></div><div className="team-avatars"><span>OC</span><span>NW</span><span>MD</span><span>EB</span><span>SL</span><b>+3</b></div><div className="team-shape">✳</div></div><div className="metrics-grid"><MetricCard label="Team members" value={members.length} change="+2" note="this quarter" icon="♧" color="violet" /><MetricCard label="Active today" value={members.filter(m => m.status === "Online").length} change="80%" note="of your team" icon="◉" color="green" /><MetricCard label="Tasks delivered" value="128" change="+16.4%" note="this month" icon="✓" color="orange" /><MetricCard label="Team efficiency" value="94.8%" change="+5.2%" note="this month" icon="↗" color="blue" /></div><Panel title="Your team" subtitle="Workspace members and availability"><div className="team-grid">{members.map(member => <article className="member-card" key={member.email || member.name}><div className={`member-avatar ${member.color}`}>{member.initials}</div><h3>{member.name}</h3><p>{member.role}</p><span className={`member-status ${member.status.toLowerCase()}`}><i />{member.status}</span><button className="text-action" onClick={() => toast(`Viewing ${member.name}'s team profile.`)}>View profile ↗</button></article>)}</div></Panel>{invite && <Modal title="Invite a teammate" onClose={() => setInvite(false)}><form className="form-stack" onSubmit={e => { e.preventDefault(); setMembers(current => [...current, { name: email.split("@")[0], role: "New teammate", status: "Offline", initials: email.slice(0, 2).toUpperCase(), color: "blue" }]); setInvite(false); setEmail(""); toast("Invitation added to the demo team."); }}><label>Work email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="teammate@company.com" /></label><button className="button-primary">Send invitation ↗</button></form></Modal>}</>;
}

function Automation() {
  const { state, dispatch } = useWorkspace();
  const toast = useToast();
  return <><PageHeading eyebrow="OPERATIONS / AUTOMATION LAB" title="Let good work flow." description="Create smart routines that keep your workspace moving." action={<button className="button-primary" onClick={() => toast("Workflow builder is a frontend demo module.")}>＋ Create workflow</button>} /><div className="automation-banner"><div><span>YOUR WORKFLOW ENGINE</span><h2>Less repetitive.<br /><em>More remarkable.</em></h2><p>Automate the little things. Make space for the big ideas.</p></div><div className="automation-visual"><div className="auto-node node-a">✉</div><div className="auto-line" /><div className="auto-node node-b">✦</div><div className="auto-line line-two" /><div className="auto-node node-c">✓</div><span className="auto-particle" /></div></div><div className="metrics-grid"><MetricCard label="Active workflows" value={state.automations.filter(a => a.active).length} change="Running" note="automations" icon="✧" color="violet" /><MetricCard label="Executions" value="2,481" change="+28.4%" note="this month" icon="↗" color="blue" /><MetricCard label="Time saved" value="38.5 hrs" change="+12 hrs" note="this month" icon="◷" color="green" /><MetricCard label="Success rate" value="99.2%" change="+0.8%" note="this month" icon="✓" color="orange" /></div><Panel title="Your automations" subtitle="Switch your workspace workflows on or off"><div className="automation-list">{state.automations.map(item => <div className="automation-row" key={item.id}><div className={`automation-icon ${item.color}`}>{item.icon}</div><div className="automation-copy"><strong>{item.name}</strong><p>{item.detail}</p><small>{item.active ? "Last run: 12 minutes ago" : "Currently paused"}</small></div><label className="switch"><input type="checkbox" checked={item.active} onChange={() => { dispatch({ type: "TOGGLE_AUTOMATION", payload: item.id }); toast(item.active ? "Automation paused." : "Automation activated."); }} /><span /></label></div>)}</div></Panel></>;
}

function Assets() {
  const { state } = useWorkspace();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = state.assets.filter(asset => (category === "All" || asset.type === category) && asset.name.toLowerCase().includes(query.toLowerCase()));
  const toast = useToast();
  return <><PageHeading eyebrow="OPERATIONS / ASSET LIBRARY" title="A home for every idea." description="Keep your team's creative universe organized and accessible." action={<button className="button-primary" onClick={() => toast("Upload area is ready for backend integration.")}>↑ Upload asset</button>} /><div className="asset-banner"><div><span>CREATIVE CLOUD / YOUR LIBRARY</span><h2>Collect. Create.<br /><em>Inspire.</em></h2><p>Everything your team needs, in one beautiful place.</p></div><div className="asset-stack"><div className="asset-tile tile-one">✳</div><div className="asset-tile tile-two">◈</div><div className="asset-tile tile-three">✦</div><div className="asset-tile tile-four">▧</div></div></div><div className="asset-toolbar"><SearchBox value={query} onChange={setQuery} placeholder="Find an asset..." /><div className="category-chips">{["All", ...new Set(state.assets.map(a => a.type))].map(item => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="asset-grid">{filtered.map(asset => <button className="asset-card" key={asset.id} onClick={() => setSelected(asset)}><div className={`asset-preview ${asset.color}`}><span>{asset.icon}</span><i>↗</i></div><div className="asset-card-info"><div><strong>{asset.name}</strong><small>{asset.type} · {asset.size}</small></div><span>•••</span></div></button>)}</div>{filtered.length === 0 && <EmptyState title="No assets found" detail="Try another category or search term." />}{selected && <Modal title={selected.name} onClose={() => setSelected(null)}><div className={`asset-preview asset-modal-preview ${selected.color}`}><span>{selected.icon}</span></div><p className="modal-description">{selected.type} · {selected.size}</p><button className="button-primary full-button" onClick={() => { toast(`${selected.name} selected.`); setSelected(null); }}>Open asset ↗</button></Modal>}</>;
}

function Settings() {
  const { state, dispatch } = useWorkspace();
  const [name, setName] = useState(state.profile.name);
  const [email, setEmail] = useState(state.profile.email);
  const toast = useToast();
  return <><PageHeading eyebrow="WORKSPACE / PREFERENCES" title="Make it yours." description="Your workspace, your settings, your way." /><div className="settings-layout"><nav className="settings-nav"><a className="settings-active" href="#profile">◉ Profile</a><a href="#appearance">◐ Appearance</a><a href="#workspace">▦ Workspace</a><a href="#preferences">♧ Preferences</a></nav><div className="settings-content"><Panel title="Personal profile" subtitle="Manage your personal workspace identity"><div className="profile-edit"><div className="profile-large">AM</div><div><strong>{state.profile.name}</strong><p>{state.profile.role}</p><button className="text-action" onClick={() => toast("Avatar upload requires a connected backend.")}>Change avatar ↗</button></div></div><form className="form-stack settings-form" onSubmit={e => { e.preventDefault(); dispatch({ type: "UPDATE_PROFILE", payload: { name, email } }); toast("Profile preferences saved."); }}><label>Full name<input value={name} onChange={e => setName(e.target.value)} required /></label><label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Role<input value={state.profile.role} readOnly /></label><button className="button-primary">Save changes ↗</button></form></Panel><Panel title="Appearance" subtitle="Choose the look of your workspace"><div className="theme-options"><button className={`theme-option ${state.theme === "light" ? "theme-selected" : ""}`} onClick={() => dispatch({ type: "SET_THEME", payload: "light" })}><span className="theme-preview light-preview">Aa</span><strong>Light mode</strong><small>Soft and bright</small></button><button className={`theme-option ${state.theme === "dark" ? "theme-selected" : ""}`} onClick={() => dispatch({ type: "SET_THEME", payload: "dark" })}><span className="theme-preview dark-preview">Aa</span><strong>Dark mode</strong><small>Focused and calm</small></button></div></Panel><Panel title="Workspace information" subtitle="Your organization at a glance"><div className="settings-info"><span>Workspace name</span><strong>Aurora Studio</strong><span>Subscription</span><strong>Pro workspace</strong><span>Created for</span><strong>Creative collaboration</strong></div></Panel></div></div></>;
}

function NotFound() {
  const navigate = useNavigate();
  return <div className="not-found"><span>404</span><h1>Lost in the universe?</h1><p>This page doesn't exist in your workspace.</p><button className="button-primary" onClick={() => navigate("/")}>Back to command center ↗</button></div>;
}

export default function App() {
  return <WorkspaceProvider><ToastProvider><BrowserRouter><AppShell /></BrowserRouter></ToastProvider></WorkspaceProvider>;
}

