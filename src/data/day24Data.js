export const initialTasks = [
  { id: 1, title: "Implement authentication flow", project: "Core Platform", priority: "High", status: "In Progress", assignee: "AM", color: "blue", due: "Nov 18", tag: "Backend" },
  { id: 2, title: "Redesign onboarding experience", project: "Web Experience", priority: "High", status: "Review", assignee: "SK", color: "purple", due: "Nov 17", tag: "Design" },
  { id: 3, title: "Optimize database queries", project: "Core Platform", priority: "Medium", status: "To Do", assignee: "HR", color: "green", due: "Nov 20", tag: "Backend" },
  { id: 4, title: "Build analytics overview", project: "Analytics Suite", priority: "Medium", status: "In Progress", assignee: "AM", color: "blue", due: "Nov 19", tag: "Frontend" },
  { id: 5, title: "Write API integration tests", project: "Core Platform", priority: "Low", status: "Done", assignee: "JD", color: "orange", due: "Nov 14", tag: "Testing" },
  { id: 6, title: "Create responsive navigation", project: "Web Experience", priority: "Medium", status: "To Do", assignee: "SK", color: "purple", due: "Nov 21", tag: "Frontend" },
  { id: 7, title: "Review deployment pipeline", project: "Infrastructure", priority: "High", status: "Review", assignee: "HR", color: "green", due: "Nov 16", tag: "DevOps" },
  { id: 8, title: "Fix notification preferences", project: "Web Experience", priority: "Low", status: "Done", assignee: "JD", color: "orange", due: "Nov 13", tag: "Frontend" },
  { id: 9, title: "Document public API endpoints", project: "Core Platform", priority: "Low", status: "To Do", assignee: "AM", color: "blue", due: "Nov 22", tag: "Documentation" }
]

export const columns = ["To Do", "In Progress", "Review", "Done"]

export const team = [
  { initials: "AM", name: "Alex Morgan", role: "Lead Developer", tasks: 8, completed: 6, color: "blue" },
  { initials: "SK", name: "Sarah Kim", role: "Product Designer", tasks: 6, completed: 4, color: "purple" },
  { initials: "HR", name: "Hamza Raza", role: "Backend Engineer", tasks: 7, completed: 5, color: "green" },
  { initials: "JD", name: "James Davis", role: "QA Engineer", tasks: 5, completed: 4, color: "orange" }
]

export const activities = [
  { initials: "AM", name: "Alex Morgan", action: "completed", target: "API integration tests", time: "12 min ago", color: "blue" },
  { initials: "SK", name: "Sarah Kim", action: "moved", target: "Onboarding experience to Review", time: "38 min ago", color: "purple" },
  { initials: "HR", name: "Hamza Raza", action: "created", target: "Database optimization task", time: "1 hour ago", color: "green" },
  { initials: "JD", name: "James Davis", action: "updated", target: "Notification preferences", time: "2 hours ago", color: "orange" }
]
