import { useMemo, useState } from "react"
import CostMetric from "../components/day25/CostMetric"
import SpendChart from "../components/day25/SpendChart"
import ServiceRow from "../components/day25/ServiceRow"
import RecommendationCard from "../components/day25/RecommendationCard"
import { services as initialServices, dailySpend, initialRecommendations, resources } from "../data/day25Data"
import "./Day25.css"

const money = value => "$" + Math.round(value).toLocaleString("en-US")

export default function Day25() {
  const [period, setPeriod] = useState("Monthly")
  const [budget, setBudget] = useState(18000)
  const [budgetInput, setBudgetInput] = useState("18000")
  const [editingBudget, setEditingBudget] = useState(false)
  const [recommendations, setRecommendations] = useState(initialRecommendations)
  const [applied, setApplied] = useState([])
  const [dismissed, setDismissed] = useState([])
  const [serviceFilter, setServiceFilter] = useState("All services")
  const [resourceSearch, setResourceSearch] = useState("")
  const [resourceFilter, setResourceFilter] = useState("All statuses")
  const [activeTab, setActiveTab] = useState("Overview")
  const [notice, setNotice] = useState("")
  const [region, setRegion] = useState("All regions")

  const savingTotal = applied.reduce((sum, item) => sum + item.saving, 0)
  const monthlyTotal = initialServices.reduce((sum, item) => sum + item.spend, 0) - savingTotal
  const multiplier = period === "Quarterly" ? 3 : 1
  const spend = monthlyTotal * multiplier
  const budgetAmount = budget * multiplier
  const budgetPercent = Math.min(100, spend / budgetAmount * 100)
  const forecast = spend * 1.12
  const remaining = Math.max(0, budgetAmount - spend)

  const filteredServices = initialServices.filter(item =>
    (serviceFilter === "All services" || item.category === serviceFilter) &&
    (region === "All regions" || item.region === region)
  )

  const filteredResources = useMemo(() => resources.filter(item =>
    `${item.name} ${item.id} ${item.type} ${item.service}`.toLowerCase().includes(resourceSearch.toLowerCase()) &&
    (resourceFilter === "All statuses" || item.status === resourceFilter)
  ), [resourceSearch, resourceFilter])

  function notify(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(""), 2600)
  }

  function applyRecommendation(id) {
    const item = recommendations.find(rec => rec.id === id)
    if (!item) return
    setApplied(current => [...current, item])
    setRecommendations(current => current.filter(rec => rec.id !== id))
    notify(`Optimization applied. Estimated ${money(item.saving)} monthly savings.`)
  }

  function dismissRecommendation(id) {
    setDismissed(current => [...current, id])
    setRecommendations(current => current.filter(rec => rec.id !== id))
    notify("Recommendation dismissed.")
  }

  function saveBudget(event) {
    event.preventDefault()
    const amount = Number(budgetInput)
    if (!Number.isFinite(amount) || amount <= 0) {
      notify("Enter a valid budget amount.")
      return
    }
    setBudget(amount)
    setEditingBudget(false)
    notify("Budget updated successfully.")
  }

  function exportCSV() {
    const rows = [
      ["Resource ID", "Resource Name", "Type", "Service", "Region", "Status", "Monthly Cost"],
      ...resources.map(item => [item.id, item.name, item.type, item.service, item.region, item.status, item.monthly])
    ]
    const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "cloudmeter-resource-report.csv"
    link.click()
    URL.revokeObjectURL(url)
    notify("Resource report exported.")
  }

  const nav = [
    { label: "Overview", icon: "▦" },
    { label: "Cost analysis", icon: "◷" },
    { label: "Resources", icon: "⬡" },
    { label: "Optimization", icon: "✳" }
  ]

  return (
    <main className="cloudmeter">
      <aside className="cloud-sidebar">
        <a className="cloud-brand" href="#home"><span className="cloud-brand-icon">C</span><span>CLOUD<span>METER</span></span></a>
        <div className="cloud-account"><span className="account-logo">N</span><div><small>ORGANIZATION</small><strong>Northstar Labs</strong></div><span>⌄</span></div>
        <div className="cloud-nav-label">WORKSPACE</div>
        <nav className="cloud-nav">
          {nav.map(item => <button key={item.label} onClick={() => setActiveTab(item.label)} className={activeTab === item.label ? "selected" : ""}><span>{item.icon}</span>{item.label}{item.label === "Optimization" && recommendations.length > 0 && <i>{recommendations.length}</i>}</button>)}
        </nav>
        <div className="cloud-sidebar-bottom">
          <div className="cloud-help"><span>✳</span><strong>Spend smarter.</strong><p>Make every cloud dollar work harder.</p><button onClick={() => setActiveTab("Optimization")}>Explore insights ↗</button></div>
          <div className="cloud-profile"><span className="profile-avatar">UE</span><div><strong>Usman Elahi</strong><small>Admin account</small></div><span className="profile-more">···</span></div>
        </div>
      </aside>

      <section className="cloud-main" id="home">
        <header className="cloud-topbar">
          <div className="cloud-breadcrumb">Northstar Labs <span>/</span> <strong>{activeTab}</strong></div>
          <div className="cloud-top-actions"><span className="connected-status"><i /> Provider connected</span><button className="cloud-notification" onClick={() => notify("No new billing alerts.")}>♧<i /></button><span className="top-profile">UE</span></div>
        </header>

        <div className="cloud-content">
          <section className="cloud-welcome">
            <div><span className="cloud-eyebrow">CLOUD FINANCIAL INTELLIGENCE</span><h1>Cloud cost overview<span>.</span></h1><p>Understand your infrastructure spend. Find opportunities. Stay in control.</p></div>
            <div className="welcome-actions"><select value={period} onChange={e => setPeriod(e.target.value)}><option>Monthly</option><option>Quarterly</option></select><button className="export-button" onClick={exportCSV}>↓ Export report</button></div>
          </section>

          <section className="provider-strip">
            <div className="provider-left"><span className="provider-symbol">☁</span><div><strong>Cloud infrastructure</strong><small>Consolidated provider overview</small></div></div>
            <div className="provider-connected"><i /> Connected <span>·</span> Last synced just now</div>
            <div className="provider-brands"><span className="provider-aws">aws</span><span className="provider-azure">▰ Azure</span><span className="provider-google">Google Cloud</span></div>
          </section>

          <section className="cost-metrics-grid">
            <CostMetric label="Total cloud spend" value={money(spend)} change="↑ 8.4%" note="Compared to previous period" icon="$" tone="blue" />
            <CostMetric label="Daily average" value={money(spend / (period === "Quarterly" ? 90 : 30))} change="Average" note="Based on selected period" icon="◷" tone="cyan" />
            <CostMetric label="Projected spend" value={money(forecast)} change="Forecast" note="Estimated period-end cost" icon="↗" tone="purple" />
            <CostMetric label="Optimization savings" value={money(savingTotal * multiplier)} change="Realized" note="Estimated monthly savings applied" icon="✳" tone="orange" />
          </section>

          <section className="analysis-grid">
            <article className="cloud-panel spend-panel">
              <div className="panel-topline"><div><span className="cloud-eyebrow">SPENDING TRENDS</span><h2>Cloud expenditure</h2><p>Daily infrastructure cost over time</p></div><span className="chart-legend"><i /> Actual spend</span></div>
              <div className="chart-total"><strong>{money(spend)}</strong><span className="chart-period-label">{period} total</span></div>
              <SpendChart data={dailySpend} period={period} />
              <div className="chart-foot"><span>01 {period === "Monthly" ? "NOV" : "Q1"}</span><span>15 {period === "Monthly" ? "NOV" : "Q2"}</span><span>30 {period === "Monthly" ? "NOV" : "Q3"}</span></div>
            </article>

            <article className="cloud-panel budget-panel">
              <div className="panel-topline"><div><span className="cloud-eyebrow">FINANCIAL CONTROL</span><h2>Budget tracking</h2></div><button className="edit-budget" onClick={() => setEditingBudget(!editingBudget)}>✎ Edit</button></div>
              {editingBudget && <form className="budget-edit-form" onSubmit={saveBudget}><label>Monthly budget ($)<input type="number" min="1" value={budgetInput} onChange={e => setBudgetInput(e.target.value)} /></label><button type="submit">Save</button></form>}
              <div className="budget-total"><strong>{money(spend)}</strong><span>of {money(budgetAmount)}</span></div>
              <div className="budget-progress"><i style={{ width: `${budgetPercent}%` }} /></div>
              <div className="budget-percent"><strong>{budgetPercent.toFixed(1)}%</strong><span>budget utilized</span></div>
              <div className="budget-details"><div><span className="budget-dot spent-dot" />Current spend<strong>{money(spend)}</strong></div><div><span className="budget-dot remaining-dot" />Remaining budget<strong>{money(remaining)}</strong></div></div>
              <div className={`budget-alert ${budgetPercent >= 90 ? "alert-warning" : ""}`}><span>{budgetPercent >= 90 ? "!" : "✓"}</span>{budgetPercent >= 90 ? "You are approaching your budget limit." : "Your spending is within the allocated budget."}</div>
            </article>
          </section>

          <section className="cloud-panel services-panel">
            <div className="section-header"><div><span className="cloud-eyebrow">WHERE YOUR MONEY GOES</span><h2>Service cost breakdown</h2><p>Explore spending across your cloud services.</p></div><div className="service-filters"><select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}><option>All services</option><option>Compute</option><option>Database</option><option>Storage</option><option>AI & ML</option><option>Networking</option></select><select value={region} onChange={e => setRegion(e.target.value)}><option>All regions</option><option>US East</option><option>US West</option><option>EU West</option></select></div></div>
            <div className="service-list">{filteredServices.map(service => <ServiceRow key={service.id} service={{ ...service, spend: service.spend * multiplier }} total={initialServices.reduce((sum, item) => sum + item.spend, 0) * multiplier} />)}</div>
            {filteredServices.length === 0 && <div className="empty-state">No services match these filters.</div>}
          </section>

          <section className="optimization-section">
            <div className="section-header"><div><span className="cloud-eyebrow">INTELLIGENT COST CONTROL</span><h2>Optimization opportunities <span className="recommendation-count">{recommendations.length}</span></h2><p>Actionable recommendations to reduce infrastructure costs.</p></div><span className="potential-saving">Potential savings <strong>{money(recommendations.reduce((sum, item) => sum + item.saving, 0) * multiplier)}/period</strong></span></div>
            {recommendations.length > 0 ? <div className="recommendation-grid">{recommendations.map(item => <RecommendationCard key={item.id} item={item} onApply={applyRecommendation} onDismiss={dismissRecommendation} />)}</div> : <div className="empty-state optimization-empty"><span>✓</span><strong>You're all caught up!</strong><p>No pending recommendations. Check back for new optimization opportunities.</p></div>}
            {applied.length > 0 && <div className="applied-summary"><span>✓</span><div><strong>{applied.length} optimization{applied.length > 1 ? "s" : ""} applied</strong><small>Estimated monthly savings: {money(savingTotal)}</small></div></div>}
          </section>

          <section className="cloud-panel inventory-panel">
            <div className="section-header"><div><span className="cloud-eyebrow">INFRASTRUCTURE VISIBILITY</span><h2>Resource inventory</h2><p>Monitor your deployed cloud resources and estimated monthly costs.</p></div><button className="export-button" onClick={exportCSV}>↓ Export CSV</button></div>
            <div className="inventory-tools"><div className="inventory-search"><span>⌕</span><input placeholder="Search resource, ID or service..." value={resourceSearch} onChange={e => setResourceSearch(e.target.value)} /></div><select value={resourceFilter} onChange={e => setResourceFilter(e.target.value)}><option>All statuses</option><option>Running</option><option>Idle</option></select></div>
            <div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>RESOURCE</th><th>TYPE</th><th>SERVICE</th><th>REGION</th><th>STATUS</th><th>MONTHLY COST</th></tr></thead><tbody>{filteredResources.map(item => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.id}</small></td><td>{item.type}</td><td>{item.service}</td><td>{item.region}</td><td><span className={`resource-status status-${item.status.toLowerCase()}`}><i />{item.status}</span></td><td className="resource-cost">{money(item.monthly)}</td></tr>)}</tbody></table></div>
            {filteredResources.length === 0 && <div className="empty-state">No resources found.</div>}
            <div className="inventory-footer">Showing {filteredResources.length} of {resources.length} resources <span>Demo infrastructure data</span></div>
          </section>

          <footer className="cloud-footer"><span>© 2026 CLOUDMETER</span><span>BUILT FOR FINANCIAL CLARITY.</span><span><i /> Cost data synchronized</span></footer>
        </div>
      </section>
      {notice && <div className="cloud-toast">✓ {notice}</div>}
    </main>
  )
}
