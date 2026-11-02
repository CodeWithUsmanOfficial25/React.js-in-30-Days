export const initialServices = [
  { id: 1, name: "Core API", detail: "api.pulsewatch.dev", region: "US East", status: "Operational", uptime: 99.98, latency: 84, requests: 1248, color: "#151515" },
  { id: 2, name: "Primary Database", detail: "db-primary.internal", region: "EU West", status: "Operational", uptime: 99.95, latency: 112, requests: 842, color: "#777777" },
  { id: 3, name: "Authentication", detail: "auth.pulsewatch.dev", region: "US West", status: "Degraded", uptime: 98.72, latency: 386, requests: 624, color: "#b18a55" },
  { id: 4, name: "Payment Gateway", detail: "payments.pulsewatch.dev", region: "AP South", status: "Operational", uptime: 99.91, latency: 146, requests: 391, color: "#444444" },
  { id: 5, name: "Media Storage", detail: "assets.pulsewatch.dev", region: "EU Central", status: "Operational", uptime: 99.99, latency: 58, requests: 2156, color: "#999999" },
  { id: 6, name: "Notification Engine", detail: "notify.pulsewatch.dev", region: "AP East", status: "Offline", uptime: 96.41, latency: 0, requests: 0, color: "#c1c1c1" }
]

export const initialIncidents = [
  { id: "INC-2048", title: "Authentication latency above threshold", service: "Authentication", severity: "Major", status: "Investigating", time: "2 min ago", description: "Elevated response times detected across authentication requests." },
  { id: "INC-2047", title: "Notification worker not responding", service: "Notification Engine", severity: "Critical", status: "Open", time: "18 min ago", description: "The notification worker has stopped responding to health checks." },
  { id: "INC-2046", title: "Database connection recovered", service: "Primary Database", severity: "Minor", status: "Resolved", time: "1 hr ago", description: "A temporary connection spike returned to normal." }
]

export const initialEvents = [
  { id: 1, type: "success", title: "Media Storage is healthy", detail: "All health checks passed", time: "Just now" },
  { id: 2, type: "warning", title: "Authentication response increased", detail: "Latency crossed 300ms threshold", time: "1 min ago" },
  { id: 3, type: "success", title: "Core API health check passed", detail: "Response received in 84ms", time: "3 min ago" },
  { id: 4, type: "neutral", title: "New monitoring cycle started", detail: "All regions are being checked", time: "5 min ago" }
]

export const formatNumber = (value) => new Intl.NumberFormat("en-US").format(Math.round(value))