import React from "react";
import { NavLink } from "react-router-dom";
import { useWorkspace } from "../context/WorkspaceContext";

const groups = [
  { label: "WORKSPACE", items: [{ path: "/", icon: "⌂", name: "Command Center" }, { path: "/analytics", icon: "◫", name: "Analytics Studio" }, { path: "/projects", icon: "▦", name: "Project Hub" }] },
  { label: "RELATIONSHIPS", items: [{ path: "/crm", icon: "◎", name: "CRM Suite" }, { path: "/team", icon: "♧", name: "Team Workspace" }] },
  { label: "OPERATIONS", items: [{ path: "/finance", icon: "◈", name: "Finance Center" }, { path: "/automation", icon: "✧", name: "Automation Lab" }, { path: "/assets", icon: "▧", name: "Asset Library" }] }
];

export default function Sidebar({ open, onNavigate }) {
  const { state } = useWorkspace();
  return <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
    <div className="brand"><div className="brand-mark">A</div><div><strong>AURORA</strong><small>WORKSPACE OS</small></div></div>
    <div className="workspace-switch"><div className="workspace-avatar">A</div><div><strong>Aurora Studio</strong><small>Pro workspace</small></div><span>⌄</span></div>
    {groups.map(group => <div className="nav-group" key={group.label}><span className="nav-label">{group.label}</span>{group.items.map(item => <NavLink end={item.path === "/"} to={item.path} key={item.path} onClick={onNavigate} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}><span className="nav-icon">{item.icon}</span>{item.name}{item.path === "/crm" && <span className="nav-count">{state.leads.length}</span>}</NavLink>)}</div>)}
    <div className="sidebar-bottom"><NavLink to="/settings" onClick={onNavigate} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}><span className="nav-icon">⚙</span>Settings</NavLink><div className="sidebar-help"><span>✦</span><strong>Need a hand?</strong><p>Explore your workspace guide.</p><button onClick={() => window.alert("Aurora workspace guide: explore each module using the sidebar.")}>Open guide ↗</button></div><div className="user-mini"><div className="user-avatar">AM</div><div><strong>{state.profile.name}</strong><small>Administrator</small></div><span>•••</span></div></div>
  </aside>;
}
