export const threatStats = [
  { label: "Threats detected", value: "2,481", change: "+12.8%", icon: "⌁", tone: "red" },
  { label: "Active incidents", value: "18", change: "6 critical", icon: "◈", tone: "amber" },
  { label: "Protected assets", value: "1,284", change: "98.6% healthy", icon: "⬡", tone: "green" },
  { label: "Mean response", value: "4m 32s", change: "-18% this week", icon: "◷", tone: "blue" }
];

export const initialIncidents = [
  { id: "INC-2048", title: "Credential stuffing attempt", source: "185.220.101.42", target: "Authentication API", severity: "Critical", status: "Investigating", time: "2 min ago", category: "Identity", events: 842, description: "Repeated login attempts detected across multiple accounts from a suspicious external source.", evidence: ["842 failed authentication attempts", "Multiple account identifiers targeted", "Unusual request frequency detected"] },
  { id: "INC-2047", title: "Unusual database access", source: "10.0.4.82", target: "Customer Database", severity: "High", status: "Investigating", time: "8 min ago", category: "Data access", events: 126, description: "A service account accessed an unusual volume of customer records outside its normal activity pattern.", evidence: ["126 records accessed", "Access outside normal service window", "Privilege usage requires review"] },
  { id: "INC-2046", title: "Suspicious file upload", source: "91.208.184.17", target: "Media Storage", severity: "Medium", status: "Open", time: "14 min ago", category: "Malware", events: 39, description: "An uploaded file triggered multiple heuristic detection rules.", evidence: ["File signature mismatch", "Unusual file extension", "Upload isolated for analysis"] },
  { id: "INC-2045", title: "API rate threshold exceeded", source: "45.83.12.90", target: "Public API Gateway", severity: "High", status: "Open", time: "21 min ago", category: "Network", events: 512, description: "A single source exceeded the configured API request threshold.", evidence: ["512 requests in one minute", "Repeated endpoint access", "Rate limit policy triggered"] },
  { id: "INC-2044", title: "Privilege escalation warning", source: "10.0.8.21", target: "Admin Console", severity: "Critical", status: "Investigating", time: "32 min ago", category: "Identity", events: 17, description: "A role transition request attempted to obtain elevated permissions.", evidence: ["Unexpected role transition", "Privileged endpoint accessed", "Approval record not found"] },
  { id: "INC-2043", title: "Unusual outbound traffic", source: "10.0.2.14", target: "External Network", severity: "Low", status: "Resolved", time: "46 min ago", category: "Network", events: 8, description: "Outbound traffic exceeded the normal baseline for a monitored workload.", evidence: ["Traffic baseline exceeded", "Destination reviewed", "No further activity observed"] }
];

export const activity = [
  { time: "19:22:08", type: "Authentication", message: "Multiple failed sign-in attempts detected", severity: "Critical", ip: "185.220.101.42" },
  { time: "19:20:44", type: "Database", message: "Unusual record access pattern identified", severity: "High", ip: "10.0.4.82" },
  { time: "19:18:31", type: "File security", message: "Suspicious upload moved to quarantine", severity: "Medium", ip: "91.208.184.17" },
  { time: "19:15:16", type: "API gateway", message: "Rate threshold exceeded", severity: "High", ip: "45.83.12.90" },
  { time: "19:12:05", type: "Identity", message: "Privilege escalation warning generated", severity: "Critical", ip: "10.0.8.21" },
  { time: "19:08:52", type: "Network", message: "Outbound traffic anomaly detected", severity: "Low", ip: "10.0.2.14" },
  { time: "19:04:27", type: "Endpoint", message: "Endpoint protection scan completed", severity: "Low", ip: "10.0.1.31" }
];

export const traffic = [32, 46, 39, 58, 43, 68, 51, 77, 60, 49, 83, 65, 91, 57, 72, 48, 62, 85, 55, 70, 44, 64, 88, 59];
export const categories = ["All incidents", "Identity", "Network", "Malware", "Data access"];
