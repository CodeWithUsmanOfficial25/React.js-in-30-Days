import { useEffect, useMemo, useState } from "react"
import { initialEvents, initialIncidents, initialServices, formatNumber } from "../data/day13Data"
import ServiceCard from "../components/day13/ServiceCard"
import "./Day13.css"

const filters = ["All", "Operational", "Degraded", "Offline"]

const makeTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })

function makeEvent(id, services) {
  const service = services[Math.floor(Math.random() * services.length)]
  const messages = [
    { type: "success", title: `${service.name} health check passed`, detail: `Response received in ${service.latency || 0}ms` },
    { type: "neutral", title: "Monitoring cycle completed", detail: "Regional checks completed successfully" },
    { type: "warning", title: `${service.name} metrics updated`, detail: "New telemetry data received" }
  ]
  return { id, ...messages[Math.floor(Math.random() * messages.length)], time: "Just now" }
}

function Metric({ label, value, unit, change, icon }) {
  return (
    <article className="metric-card">
      <div className="metric-heading">
        <span>{label}</span>
        <span className="metric-icon">{icon}</span>
      </div>
      <div className="metric-value">{value}<small>{unit}</small></div>
      <div className="metric-foot"><span className="metric-dot" />{change}</div>
    </article>
  )
}

function OrbitalCore({ running, cpu }) {
  return (
    <div className={`orbital-core ${running ? "is-running" : "is-paused"}`}>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="core-shadow" />
      <div className="core-sphere">
        <div className="sphere-shine" />
        <div className="sphere-label">SYSTEM</div>
        <strong>{running ? "LIVE" : "PAUSED"}</strong>
        <span>{cpu}% load</span>
      </div>
      <span className="orbit-node node-one" />
      <span className="orbit-node node-two" />
      <span className="orbit-node node-three" />
    </div>
  )
}

function IncidentRow({ incident, onUpdate }) {
  return (
    <div className="incident-row">
      <span className={`severity-mark ${incident.severity.toLowerCase()}`} />
      <div className="incident-content">
        <strong>{incident.title}</strong>
        <span>{incident.id} · {incident.service} · {incident.time}</span>
      </div>
      <span className={`incident-status ${incident.status.toLowerCase()}`}>{incident.status}</span>
      {incident.status !== "Resolved" && (
        <button className="incident-action" onClick={() => onUpdate(incident.id)} type="button">
          {incident.status === "Open" ? "Acknowledge" : "Resolve"}
        </button>
      )}
    </div>
  )
}

export default function Day13() {
  const [services, setServices] = useState(initialServices)
  const [incidents, setIncidents] = useState(initialIncidents)
  const [events, setEvents] = useState(initialEvents)
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")
  const [running, setRunning] = useState(true)
  const [selected, setSelected] = useState(null)
  const [activeTab, setActiveTab] = useState("Overview")
  const [clock, setClock] = useState(makeTime)
  const [cpu, setCpu] = useState(42)
  const [memory, setMemory] = useState(68)
  const [requests, setRequests] = useState(12480)
  const [response, setResponse] = useState(126)

  useEffect(() => {
    const clockTimer = window.setInterval(() => setClock(makeTime()), 1000)
    return () => window.clearInterval(clockTimer)
  }, [])

  useEffect(() => {
    if (!running) return undefined
    const timer = window.setInterval(() => {
      setCpu(value => Math.max(18, Math.min(91, value + Math.round(Math.random() * 10 - 5))))
      setMemory(value => Math.max(35, Math.min(88, value + Math.round(Math.random() * 4 - 2))))
      setRequests(value => value + Math.floor(Math.random() * 45 + 12))
      setResponse(value => Math.max(72, Math.min(220, value + Math.round(Math.random() * 18 - 9))))
      setServices(current => current.map(service => {
        if (service.status === "Offline") return service
        const nextLatency = Math.max(45, Math.min(490, service.latency + Math.round(Math.random() * 30 - 15)))
        return { ...service, latency: nextLatency, requests: service.requests + Math.floor(Math.random() * 12) }
      }))
      setEvents(current => [makeEvent(Date.now(), services), ...current].slice(0, 7))
    }, 3500)
    return () => window.clearInterval(timer)
  }, [running])

  const visibleServices = useMemo(() => services.filter(service => {
    const matchesFilter = filter === "All" || service.status === filter
    const matchesQuery = `${service.name} ${service.detail} ${service.region}`.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  }), [services, filter, query])

  const operational = services.filter(service => service.status === "Operational").length
  const activeIncidents = incidents.filter(incident => incident.status !== "Resolved").length
  const averageUptime = services.reduce((sum, service) => sum + service.uptime, 0) / services.length

  function updateIncident(id) {
    setIncidents(current => current.map(incident => incident.id === id
      ? { ...incident, status: incident.status === "Open" ? "Investigating" : "Resolved" }
      : incident))
  }

  function resetDemo() {
    setServices(initialServices)
    setIncidents(initialIncidents)
    setEvents(initialEvents)
    setCpu(42)
    setMemory(68)
    setRequests(12480)
    setResponse(126)
    setFilter("All")
    setQuery("")
    setRunning(true)
    setSelected(null)
    setActiveTab("Overview")
  }

  return (
    <main className="pulsewatch">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#overview">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>pulse<span>watch</span></span>
        </a>
        <nav className="main-nav">
          {["Overview", "Services", "Incidents"].map(tab => (
            <button key={tab} className={activeTab === tab ? "nav-link active" : "nav-link"} onClick={() => { setActiveTab(tab); document.getElementById(tab.toLowerCase())?.scrollIntoView({ behavior: "smooth" }) }}>
              {tab}
              {tab === "Incidents" && activeIncidents > 0 && <span className="nav-count">{activeIncidents}</span>}
            </button>
          ))}
        </nav>
        <div className="topbar-right">
          <span className="live-clock">{clock}</span>
          <button className="profile-orb" title="Demo profile">U</button>
        </div>
      </header>

      <section className="welcome-row" id="overview">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> SYSTEM CONTROL CENTER</div>
          <h1>Good evening. <span>Everything in view.</span></h1>
          <p className="welcome-subtitle">A live pulse check across your infrastructure.</p>
        </div>
        <div className="control-cluster">
          <span className={`monitor-state ${running ? "on" : "off"}`}><i />{running ? "Monitoring live" : "Monitoring paused"}</span>
          <button className="monitor-button" onClick={() => setRunning(value => !value)}>{running ? "Ⅱ Pause" : "▶ Resume"}</button>
        </div>
      </section>

      <section className="hero-grid">
        <div className="hero-panel">
          <div className="hero-panel-top">
            <div><span className="eyebrow">NETWORK HEALTH</span><h2>Your systems, <em>in orbit.</em></h2></div>
            <span className="hero-period">LIVE / 24H</span>
          </div>
          <div className="hero-center">
            <OrbitalCore running={running} cpu={cpu} />
            <div className="hero-side-stat left-stat"><span>CPU LOAD</span><strong>{cpu}<small>%</small></strong><div className="mini-track"><i style={{ width: `${cpu}%` }} /></div></div>
            <div className="hero-side-stat right-stat"><span>MEMORY</span><strong>{memory}<small>%</small></strong><div className="mini-track"><i style={{ width: `${memory}%` }} /></div></div>
          </div>
          <div className="hero-panel-bottom">
            <span><i className="legend-dot dark" /> Infrastructure active</span>
            <span>Last sync: {clock}</span>
          </div>
        </div>
        <div className="hero-aside">
          <div className="availability-card">
            <div className="availability-top"><span>GLOBAL UPTIME</span><span className="availability-icon">↗</span></div>
            <div className="uptime-number">{averageUptime.toFixed(2)}<small>%</small></div>
            <p>Average availability across monitored services.</p>
            <div className="uptime-bars">{Array.from({ length: 28 }, (_, index) => <i key={index} className={index === 19 ? "bar-alert" : ""} />)}</div>
            <div className="availability-foot"><span>Last 28 intervals</span><strong>+0.08%</strong></div>
          </div>
          <div className="incident-summary">
            <div className="summary-icon">!</div>
            <div><span>ACTIVE INCIDENTS</span><strong>{activeIncidents.toString().padStart(2, "0")}</strong></div>
            <span className="summary-arrow">↗</span>
          </div>
        </div>
      </section>

      <section className="metrics-grid">
        <Metric label="Total requests" value={formatNumber(requests)} unit="" change="Requests processed" icon="↗" />
        <Metric label="Avg. response" value={response} unit="ms" change="Within normal range" icon="◷" />
        <Metric label="Healthy services" value={`${operational}/${services.length}`} unit="" change="Services operational" icon="◉" />
        <Metric label="Memory usage" value={memory} unit="%" change="Current allocation" icon="⌁" />
      </section>

      <section className="content-section" id="services">
        <div className="section-heading">
          <div><span className="eyebrow">INFRASTRUCTURE</span><h2>Service landscape</h2><p>Monitor each component in your environment.</p></div>
          <span className="section-count">{services.length} SERVICES</span>
        </div>
        <div className="service-toolbar">
          <div className="filter-pills">
            {filters.map(item => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "filter-pill selected" : "filter-pill"}>{item}{item === "All" && <span>{services.length}</span>}</button>)}
          </div>
          <label className="search-field"><span>⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search services..." /></label>
        </div>
        <div className="services-grid">
          {visibleServices.map(service => <ServiceCard key={service.id} service={service} onInspect={setSelected} />)}
          {visibleServices.length === 0 && <div className="empty-state">No services match this search.</div>}
        </div>
      </section>

      <section className="lower-grid">
        <div className="lower-panel" id="incidents">
          <div className="panel-heading"><div><span className="eyebrow">ATTENTION REQUIRED</span><h2>Incident center</h2></div><span className="panel-counter">{activeIncidents} ACTIVE</span></div>
          <div className="incident-list">
            {incidents.map(incident => <IncidentRow key={incident.id} incident={incident} onUpdate={updateIncident} />)}
          </div>
        </div>
        <div className="lower-panel activity-panel">
          <div className="panel-heading"><div><span className="eyebrow">LIVE TELEMETRY</span><h2>Activity stream</h2></div><span className="stream-live"><i /> LIVE</span></div>
          <div className="event-list">
            {events.map(event => <div className="event-row" key={event.id}><span className={`event-indicator ${event.type}`} /><div><strong>{event.title}</strong><span>{event.detail}</span></div><time>{event.time}</time></div>)}
          </div>
        </div>
      </section>

      <footer className="page-footer"><span>pulsewatch <b>© 2026</b></span><span>Infrastructure intelligence, made visible.</span><button onClick={resetDemo}>↺ Reset demo</button></footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section className="service-modal" onClick={event => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <span className="eyebrow">SERVICE INSPECTOR</span>
            <span className="modal-symbol">{selected.name.slice(0, 1)}</span>
            <h2>{selected.name}</h2>
            <p>{selected.detail}</p>
            <span className={`status-pill ${selected.status.toLowerCase()}`}><i />{selected.status}</span>
            <div className="modal-stats">
              <div><span>Uptime</span><strong>{selected.uptime.toFixed(2)}%</strong></div>
              <div><span>Latency</span><strong>{selected.latency ? `${selected.latency}ms` : "Offline"}</strong></div>
              <div><span>Requests</span><strong>{formatNumber(selected.requests)}</strong></div>
              <div><span>Region</span><strong>{selected.region}</strong></div>
            </div>
            <button className="modal-done" onClick={() => setSelected(null)}>Close inspector</button>
          </section>
        </div>
      )}
    </main>
  )
}