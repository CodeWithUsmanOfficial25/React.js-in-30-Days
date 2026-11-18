import { useMemo, useState } from "react";
import MetricCard from "../components/day26/MetricCard";
import IncidentRow from "../components/day26/IncidentRow";
import TrafficChart from "../components/day26/TrafficChart";
import { threatStats, initialIncidents, activity, traffic, categories } from "../data/day26Data";
import "./Day26.css";

export default function Day26() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [selected, setSelected] = useState(initialIncidents[0]);
  const [filter, setFilter] = useState("All incidents");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [toast, setToast] = useState("");
  const [logs, setLogs] = useState(activity);

  const filtered = useMemo(() => incidents.filter(item => {
    const matchesCategory = filter === "All incidents" || item.category === filter;
    const query = search.toLowerCase();
    return matchesCategory && `${item.title} ${item.id} ${item.source} ${item.target}`.toLowerCase().includes(query);
  }), [incidents, filter, search]);

  const notify = message => {
    setToast(message);
    window.clearTimeout(window.__threatToast);
    window.__threatToast = window.setTimeout(() => setToast(""), 2600);
  };

  const updateIncident = (id, status) => {
    setIncidents(current => current.map(item => item.id === id ? { ...item, status } : item));
    setSelected(current => current?.id === id ? { ...current, status } : current);
    notify(`${id} marked as ${status.toLowerCase()}`);
  };

  const addLog = () => {
    const entry = {
      time: new Date().toLocaleTimeString("en-GB"),
      type: "Security scan",
      message: "Manual threat scan completed successfully",
      severity: "Low",
      ip: "127.0.0.1"
    };
    setLogs(current => [entry, ...current]);
    notify("Security scan completed — new event logged");
  };

  const activeCount = incidents.filter(item => item.status !== "Resolved").length;
  const criticalCount = incidents.filter(item => item.severity === "Critical" && item.status !== "Resolved").length;

  return (
    <main className="threatdesk">
      <aside className="td-sidebar">
        <a className="td-brand" href="#overview"><span className="brand-symbol">T</span><span>THREAT<span>DESK</span><small>SECURITY OPERATIONS</small></span></a>
        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace-card"><span className="workspace-avatar">N</span><span><strong>Northstar Systems</strong><small>Enterprise workspace</small></span><span className="workspace-chevron">⌄</span></div>
        <div className="nav-caption">OPERATIONS</div>
        <nav className="td-nav">
          {["Overview", "Incidents", "Threat intelligence", "Event logs", "Assets"].map((item, index) => (
            <button key={item} className={activeTab === item ? "active" : ""} onClick={() => { setActiveTab(item); document.getElementById(item === "Overview" ? "overview" : item === "Incidents" ? "incidents" : item === "Event logs" ? "logs" : "intelligence")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span>{["◫", "◈", "⌁", "≋", "⬡"][index]}</span>{item}
              {item === "Incidents" && <i>{activeCount}</i>}
            </button>
          ))}
        </nav>
        <div className="nav-caption">SYSTEM</div>
        <nav className="td-nav">
          <button onClick={() => notify("Policy settings are in demo mode")}><span>⚙</span>Policies</button>
          <button onClick={() => notify("Help center is in demo mode")}><span>?</span>Help center</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="protection-card"><span>✦</span><strong>Protection active</strong><p>All monitored systems are connected to the security console.</p><div><i /> System operational</div></div>
          <div className="td-user"><span className="user-avatar">UE</span><span><strong>Usman Elahi</strong><small>Security analyst</small></span><button onClick={() => notify("Account menu opened")}>•••</button></div>
        </div>
      </aside>

      <section className="td-main" id="overview">
        <header className="td-topbar">
          <div className="breadcrumb">Security operations <span>/</span> <strong>{activeTab}</strong></div>
          <div className="topbar-right"><span className="system-online"><i /> ALL SYSTEMS OPERATIONAL</span><button className="icon-button" onClick={addLog}>↻</button><span className="top-avatar">UE</span></div>
        </header>

        <div className="td-content">
          <section className="td-heading">
            <div><div className="eyebrow"><span /> SECURITY OPERATIONS CENTER <span className="eyebrow-divider">/</span> NOV 18, 2026</div><h1>Threat intelligence <em>at a glance.</em></h1><p>Monitor suspicious activity, investigate incidents and protect your infrastructure.</p></div>
            <button className="scan-button" onClick={addLog}><span>⌁</span> Run security scan</button>
          </section>

          <section className="metric-grid">
            {threatStats.map(item => <MetricCard key={item.label} item={item} />)}
          </section>

          <section className="overview-grid">
            <article className="td-panel traffic-panel">
              <div className="panel-heading"><div><span className="panel-kicker">NETWORK TELEMETRY</span><h2>Threat activity</h2><p>Suspicious traffic over the last 24 hours</p></div><span className="live-pill"><i /> LIVE MONITORING</span></div>
              <div className="traffic-summary"><strong>8,492</strong><span>events monitored</span><b>↑ 8.4%</b></div>
              <TrafficChart values={traffic} />
              <div className="traffic-legend"><span><i className="legend-red" /> Suspicious traffic</span><span><i className="legend-blue" /> Normal baseline</span></div>
            </article>
            <article className="td-panel severity-panel">
              <div className="panel-heading"><div><span className="panel-kicker">INCIDENT DISTRIBUTION</span><h2>Severity overview</h2><p>Current unresolved incidents</p></div><span className="panel-menu">•••</span></div>
              <div className="severity-total"><strong>{activeCount}</strong><span>active incidents</span></div>
              <div className="severity-stack"><i style={{ width: "24%" }} /><i style={{ width: "34%" }} /><i style={{ width: "28%" }} /><i style={{ width: "14%" }} /></div>
              <div className="severity-breakdown">
                {[["Critical", criticalCount, "sev-critical"], ["High", incidents.filter(i => i.severity === "High" && i.status !== "Resolved").length, "sev-high"], ["Medium", incidents.filter(i => i.severity === "Medium" && i.status !== "Resolved").length, "sev-medium"], ["Low", incidents.filter(i => i.severity === "Low" && i.status !== "Resolved").length, "sev-low"]].map(item => <div key={item[0]}><span><i className={item[2]} />{item[0]}</span><strong>{item[1]}</strong></div>)}
              </div>
              <div className="critical-note"><span>!</span><div><strong>{criticalCount} critical incidents require attention</strong><small>Review and respond to high-priority alerts.</small></div></div>
            </article>
          </section>

          <section className="td-panel incidents-panel" id="incidents">
            <div className="panel-heading incident-heading"><div><span className="panel-kicker">THREAT RESPONSE</span><h2>Incident queue <span className="count-badge">{activeCount}</span></h2><p>Review, investigate and manage security incidents.</p></div><button className="text-action" onClick={() => { setFilter("All incidents"); setSearch(""); }}>Reset filters ↗</button></div>
            <div className="incident-toolbar"><label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search incidents, IPs or targets..." /></label><select value={filter} onChange={e => setFilter(e.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></div>
            <div className="incident-table-head"><span>INCIDENT</span><span>SEVERITY</span><span>STATUS</span><span /></div>
            <div className="incident-list">{filtered.map(item => <IncidentRow key={item.id} incident={item} selected={selected?.id === item.id} onSelect={setSelected} />)}{filtered.length === 0 && <div className="no-results">No incidents match your search.</div>}</div>
            <div className="table-footer">Showing {filtered.length} of {incidents.length} incidents <span>Demo environment · Sample security data</span></div>
          </section>

          <section className="lower-grid">
            <article className="td-panel detail-panel">
              <div className="panel-heading"><div><span className="panel-kicker">CASE INVESTIGATION</span><h2>Incident details</h2><p>Selected security event and response information</p></div><span className="detail-id">{selected?.id}</span></div>
              {selected && <div className="selected-case">
                <div className="case-title"><span className={`severity-mark severity-${selected.severity.toLowerCase()}`} /><div><h3>{selected.title}</h3><small>{selected.category} · {selected.time}</small></div></div>
                <p className="case-description">{selected.description}</p>
                <div className="case-facts"><div><small>SOURCE IP</small><strong>{selected.source}</strong></div><div><small>TARGET</small><strong>{selected.target}</strong></div><div><small>EVENTS</small><strong>{selected.events}</strong></div><div><small>SEVERITY</small><strong className={`severity-text-${selected.severity.toLowerCase()}`}>{selected.severity}</strong></div></div>
                <div className="evidence-heading">DETECTED EVIDENCE</div>
                <ul className="evidence-list">{selected.evidence.map(item => <li key={item}><span>✓</span>{item}</li>)}</ul>
                <div className="case-actions"><button className="resolve-button" disabled={selected.status === "Resolved"} onClick={() => updateIncident(selected.id, "Resolved")}>✓ Resolve incident</button><button className="investigate-button" onClick={() => updateIncident(selected.id, "Investigating")}>Investigating</button></div>
              </div>}
            </article>

            <article className="td-panel intelligence-panel" id="intelligence">
              <div className="panel-heading"><div><span className="panel-kicker">THREAT INTELLIGENCE</span><h2>Attack surface</h2><p>Illustrative infrastructure activity map</p></div><span className="map-status"><i /> ACTIVE</span></div>
              <div className="network-visual">
                <div className="network-grid" />
                <svg viewBox="0 0 420 230" preserveAspectRatio="xMidYMid meet">
                  <g stroke="#49647c" strokeWidth="1.2" strokeDasharray="4 5" fill="none"><path d="M55 55 L205 110 L355 50 M55 55 L95 185 L205 110 L320 185 L355 50 M95 185 L355 50 M205 110 L320 185" /></g>
                  <g stroke="#e66b66" strokeWidth="1.8" fill="none"><path d="M55 55 L205 110 L355 50" /><path d="M95 185 L205 110" /></g>
                  {[[55,55],[205,110],[355,50],[95,185],[320,185]].map((p,i) => <g key={i}><circle cx={p[0]} cy={p[1]} r="13" fill={i===0||i===2?"#e66b66":"#4eb99b"} opacity=".16" /><circle cx={p[0]} cy={p[1]} r="5" fill={i===0||i===2?"#ef7770":"#59c5a6"} /><circle cx={p[0]} cy={p[1]} r="2" fill="#f4f6f8" /></g>)}
                  <g fill="#9bb0c3" fontSize="9"><text x="30" y="35">External</text><text x="180" y="91">Gateway</text><text x="330" y="30">API</text><text x="70" y="210">Database</text><text x="300" y="210">Storage</text></g>
                </svg>
                <span className="map-caption">SIMULATED NETWORK TOPOLOGY</span>
              </div>
              <div className="network-legend"><span><i className="legend-red" /> Suspicious node</span><span><i className="legend-green" /> Protected asset</span></div>
              <div className="intel-summary"><span>5 monitored nodes</span><strong>2 suspicious connections</strong></div>
            </article>
          </section>

          <section className="td-panel logs-panel" id="logs">
            <div className="panel-heading"><div><span className="panel-kicker">AUDIT TRAIL</span><h2>Recent security events</h2><p>Latest activity across monitored infrastructure.</p></div><button className="text-action" onClick={addLog}>Refresh events ↻</button></div>
            <div className="event-list">{logs.slice(0, 7).map((item, index) => <div className="event-row" key={`${item.time}-${index}`}><span className="event-time">{item.time}</span><span className={`event-dot severity-${item.severity.toLowerCase()}`} /><span className="event-type">{item.type}</span><span className="event-message">{item.message}</span><span className="event-ip">{item.ip}</span><span className={`severity-label severity-text-${item.severity.toLowerCase()}`}>{item.severity}</span></div>)}</div>
          </section>
          <footer className="td-footer"><span>THREATDESK SECURITY PLATFORM · FRONTEND DEMO</span><span><i /> All systems operational</span><span>Sample data · No real network actions</span></footer>
        </div>
      </section>
      {toast && <div className="td-toast"><span>✓</span>{toast}</div>}
    </main>
  );
}
