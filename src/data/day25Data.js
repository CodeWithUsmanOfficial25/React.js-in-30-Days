export const services = [
  { id: 1, name: "Compute Engine", category: "Compute", icon: "◈", spend: 4820, previous: 4310, usage: "82%", resources: 24, region: "US East", color: "blue" },
  { id: 2, name: "Managed Database", category: "Database", icon: "▤", spend: 3260, previous: 2910, usage: "68%", resources: 12, region: "EU West", color: "purple" },
  { id: 3, name: "Object Storage", category: "Storage", icon: "▧", spend: 1840, previous: 1690, usage: "54%", resources: 38, region: "US West", color: "cyan" },
  { id: 4, name: "AI Processing", category: "AI & ML", icon: "✳", spend: 2150, previous: 1280, usage: "91%", resources: 8, region: "US East", color: "orange" },
  { id: 5, name: "Network Transfer", category: "Networking", icon: "⌁", spend: 980, previous: 1050, usage: "42%", resources: 16, region: "EU West", color: "green" },
  { id: 6, name: "Container Registry", category: "Compute", icon: "⬡", spend: 620, previous: 580, usage: "37%", resources: 9, region: "US East", color: "blue" }
]

export const dailySpend = [
  { day: "01", value: 390 }, { day: "02", value: 420 }, { day: "03", value: 365 },
  { day: "04", value: 480 }, { day: "05", value: 510 }, { day: "06", value: 455 },
  { day: "07", value: 530 }, { day: "08", value: 495 }, { day: "09", value: 570 },
  { day: "10", value: 535 }, { day: "11", value: 610 }, { day: "12", value: 580 },
  { day: "13", value: 655 }, { day: "14", value: 590 }, { day: "15", value: 680 },
  { day: "16", value: 625 }, { day: "17", value: 710 }, { day: "18", value: 665 },
  { day: "19", value: 730 }, { day: "20", value: 690 }, { day: "21", value: 750 },
  { day: "22", value: 700 }, { day: "23", value: 780 }, { day: "24", value: 740 },
  { day: "25", value: 810 }, { day: "26", value: 755 }, { day: "27", value: 830 },
  { day: "28", value: 790 }, { day: "29", value: 860 }, { day: "30", value: 820 }
]

export const initialRecommendations = [
  { id: 1, title: "Right-size underutilized compute instances", description: "12 instances are running below 35% average CPU utilization. Consider smaller instance sizes.", saving: 840, category: "Compute", impact: "High", icon: "◈" },
  { id: 2, title: "Optimize AI processing workloads", description: "Move non-urgent AI jobs to scheduled batch processing to reduce peak usage.", saving: 620, category: "AI & ML", impact: "High", icon: "✳" },
  { id: 3, title: "Remove unattached storage volumes", description: "8 storage volumes have no active attachments and may no longer be required.", saving: 280, category: "Storage", impact: "Medium", icon: "▧" },
  { id: 4, title: "Review database reserved capacity", description: "Committed capacity could reduce costs for predictable database workloads.", saving: 410, category: "Database", impact: "Medium", icon: "▤" }
]

export const resources = [
  { id: "VM-2048", name: "production-api-01", type: "Virtual Machine", service: "Compute", region: "US East", status: "Running", monthly: 420 },
  { id: "DB-1022", name: "primary-postgres", type: "Database", service: "Database", region: "EU West", status: "Running", monthly: 680 },
  { id: "ST-3091", name: "media-assets-prod", type: "Storage Bucket", service: "Storage", region: "US West", status: "Running", monthly: 185 },
  { id: "AI-4090", name: "embedding-worker", type: "AI Workload", service: "AI & ML", region: "US East", status: "Running", monthly: 540 },
  { id: "VM-2049", name: "staging-worker-02", type: "Virtual Machine", service: "Compute", region: "EU West", status: "Idle", monthly: 160 },
  { id: "NW-6010", name: "global-edge-network", type: "Network", service: "Networking", region: "US West", status: "Running", monthly: 230 },
  { id: "DB-1023", name: "analytics-replica", type: "Database", service: "Database", region: "US East", status: "Idle", monthly: 310 }
]
