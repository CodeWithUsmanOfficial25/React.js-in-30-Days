import React, { createContext, useContext, useEffect, useReducer } from "react";

const WorkspaceContext = createContext(null);

const initialState = {
  projects: [
    { id: 1, name: "Aurora Rebrand", category: "Design", progress: 82, status: "In progress", color: "violet", due: "Nov 28" },
    { id: 2, name: "Mobile Experience", category: "Product", progress: 64, status: "In progress", color: "blue", due: "Dec 02" },
    { id: 3, name: "Growth Campaign", category: "Marketing", progress: 100, status: "Completed", color: "orange", due: "Nov 18" },
    { id: 4, name: "Customer Portal", category: "Engineering", progress: 38, status: "Planning", color: "green", due: "Dec 12" }
  ],
  tasks: [
    { id: 1, title: "Finalize landing page", owner: "Olivia Chen", priority: "High", done: false, project: "Aurora Rebrand" },
    { id: 2, title: "Review mobile prototypes", owner: "Noah Williams", priority: "Medium", done: true, project: "Mobile Experience" },
    { id: 3, title: "Prepare campaign assets", owner: "Mia Davis", priority: "High", done: false, project: "Growth Campaign" },
    { id: 4, title: "Update component library", owner: "Ethan Brooks", priority: "Low", done: false, project: "Customer Portal" },
    { id: 5, title: "Audit customer feedback", owner: "Sophia Lee", priority: "Medium", done: false, project: "Aurora Rebrand" }
  ],
  leads: [
    { id: 1, name: "Northstar Studio", email: "hello@northstar.io", company: "Northstar", value: 8400, stage: "Qualified", avatar: "NS" },
    { id: 2, name: "Luna Creative", email: "team@lunacreative.co", company: "Luna Creative", value: 5200, stage: "Proposal", avatar: "LC" },
    { id: 3, name: "Vertex Labs", email: "contact@vertex.dev", company: "Vertex Labs", value: 12600, stage: "Negotiation", avatar: "VL" },
    { id: 4, name: "Bloom Agency", email: "hi@bloom.agency", company: "Bloom", value: 3100, stage: "New", avatar: "BA" }
  ],
  transactions: [
    { id: 1, title: "Product subscription", category: "Income", amount: 4800, date: "Nov 22", color: "green" },
    { id: 2, title: "Creative software", category: "Expense", amount: -240, date: "Nov 21", color: "orange" },
    { id: 3, title: "Consulting project", category: "Income", amount: 3200, date: "Nov 20", color: "blue" },
    { id: 4, title: "Team workspace", category: "Expense", amount: -180, date: "Nov 19", color: "violet" },
    { id: 5, title: "Design retainer", category: "Income", amount: 5600, date: "Nov 17", color: "green" }
  ],
  automations: [
    { id: 1, name: "Welcome new leads", detail: "Send a welcome email when a lead is created", active: true, icon: "✉️", color: "blue" },
    { id: 2, name: "Task deadline alerts", detail: "Notify owners before task deadlines", active: true, icon: "⏰", color: "orange" },
    { id: 3, name: "Weekly performance report", detail: "Prepare a weekly workspace summary", active: false, icon: "📊", color: "violet" },
    { id: 4, name: "New project checklist", detail: "Create a starter checklist for new projects", active: true, icon: "✦", color: "green" }
  ],
  assets: [
    { id: 1, name: "Aurora Brand Kit", type: "Branding", size: "24 MB", icon: "🎨", color: "violet" },
    { id: 2, name: "Dashboard Components", type: "UI Kit", size: "12 MB", icon: "🧩", color: "blue" },
    { id: 3, name: "Campaign Photography", type: "Images", size: "86 MB", icon: "📸", color: "orange" },
    { id: 4, name: "Product Roadmap", type: "Documents", size: "4 MB", icon: "📄", color: "green" },
    { id: 5, name: "Motion Collection", type: "Animation", size: "32 MB", icon: "🎬", color: "pink" },
    { id: 6, name: "Icon Universe", type: "Icons", size: "8 MB", icon: "🌈", color: "yellow" }
  ],
  notifications: [
    { id: 1, title: "Project milestone reached", detail: "Aurora Rebrand is now 82% complete.", time: "10 min ago", read: false },
    { id: 2, title: "New lead added", detail: "Bloom Agency joined your CRM.", time: "1 hour ago", read: false },
    { id: 3, title: "Weekly report is ready", detail: "Your performance summary is available.", time: "Yesterday", read: true }
  ],
  profile: { name: "Alex Morgan", role: "Workspace Administrator", email: "alex@aurora.studio" },
  theme: "light"
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [{ ...action.payload, id: Date.now(), done: false }, ...state.tasks] };
    case "TOGGLE_TASK":
      return { ...state, tasks: state.tasks.map(task => task.id === action.payload ? { ...task, done: !task.done } : task) };
    case "ADD_LEAD":
      return { ...state, leads: [{ ...action.payload, id: Date.now(), avatar: action.payload.name.slice(0, 2).toUpperCase() }, ...state.leads] };
    case "UPDATE_LEAD":
      return { ...state, leads: state.leads.map(lead => lead.id === action.payload.id ? { ...lead, stage: action.payload.stage } : lead) };
    case "ADD_PROJECT":
      return { ...state, projects: [{ ...action.payload, id: Date.now(), progress: 0, status: "Planning", color: "blue" }, ...state.projects] };
    case "TOGGLE_AUTOMATION":
      return { ...state, automations: state.automations.map(item => item.id === action.payload ? { ...item, active: !item.active } : item) };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [{ ...action.payload, id: Date.now() }, ...state.transactions] };
    case "MARK_READ":
      return { ...state, notifications: state.notifications.map(item => ({ ...item, read: true })) };
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.payload } };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

export function WorkspaceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, saved => {
    try {
      const stored = localStorage.getItem("aurora-workspace");
      return stored ? { ...saved, ...JSON.parse(stored) } : saved;
    } catch {
      return saved;
    }
  });

  useEffect(() => {
    localStorage.setItem("aurora-workspace", JSON.stringify(state));
  }, [state]);

  return <WorkspaceContext.Provider value={{ state, dispatch }}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return context;
}
