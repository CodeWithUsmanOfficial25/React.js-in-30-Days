import { useMemo, useState } from "react"
import TransactionItem from "../components/day09/TransactionItem"
import {
  initialTransactions,
  categories,
  expenseCategories,
  initialBudgets,
  money,
  todayLocal
} from "../data/day09Data"
import "./Day09.css"

const blankForm = () => ({
  title: "",
  category: "Food",
  type: "expense",
  amount: "",
  date: todayLocal()
})

const categoryIcons = {
  Food: "◉",
  Housing: "⌂",
  Transport: "↗",
  Bills: "▤",
  Education: "▣",
  Lifestyle: "✳",
  Shopping: "◇",
  Health: "♡",
  Other: "＋"
}

function MetricCard({ label, value, note, icon, tone }) {
  return (
    <article className={"sw-metric " + tone}>
      <div className="sw-metric-top">
        <span>{label}</span>
        <span className="sw-metric-icon">{icon}</span>
      </div>
      <strong className="sw-metric-value">{value}</strong>
      <span className="sw-metric-note">{note}</span>
    </article>
  )
}

function SectionHeading({ eyebrow, title, action, onAction }) {
  return (
    <div className="sw-section-heading">
      <div>
        <span className="sw-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action && <button className="sw-text-button" onClick={onAction}>{action} ↗</button>}
    </div>
  )
}

export default function Day09() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [budgets, setBudgets] = useState(initialBudgets)
  const [activePage, setActivePage] = useState("Overview")
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(blankForm)
  const [formError, setFormError] = useState("")
  const [budgetDraft, setBudgetDraft] = useState(initialBudgets)
  const [budgetSaved, setBudgetSaved] = useState(false)

  const totals = useMemo(() => {
    const income = transactions.filter(item => item.type === "income").reduce((sum, item) => sum + item.amount, 0)
    const expenses = transactions.filter(item => item.type === "expense").reduce((sum, item) => sum + item.amount, 0)
    return { income, expenses, balance: income - expenses, savings: income ? Math.round(((income - expenses) / income) * 100) : 0 }
  }, [transactions])

  const spentByCategory = useMemo(() => {
    return transactions.reduce((result, item) => {
      if (item.type === "expense") result[item.category] = (result[item.category] || 0) + item.amount
      return result
    }, {})
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    return [...transactions]
      .filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))
      .filter(item => typeFilter === "all" || item.type === typeFilter)
      .filter(item => categoryFilter === "all" || item.category === categoryFilter)
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
  }, [transactions, search, typeFilter, categoryFilter])

  const totalBudget = Object.values(budgets).reduce((sum, amount) => sum + Number(amount || 0), 0)
  const totalSpent = Object.values(spentByCategory).reduce((sum, amount) => sum + amount, 0)
  const budgetRemaining = totalBudget - totalSpent
  const overBudgetCategories = expenseCategories.filter(category => (spentByCategory[category] || 0) > Number(budgets[category] || 0))

  const addTransaction = event => {
    event.preventDefault()
    const amount = Number(form.amount)
    if (!form.title.trim()) {
      setFormError("Please enter a transaction title.")
      return
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Enter an amount greater than zero.")
      return
    }
    if (!form.date) {
      setFormError("Please choose a transaction date.")
      return
    }
    setTransactions(previous => [{
      ...form,
      id: Date.now(),
      title: form.title.trim(),
      amount
    }, ...previous])
    setForm(blankForm())
    setFormError("")
    setShowForm(false)
    setActivePage("Transactions")
  }

  const deleteTransaction = id => {
    setTransactions(previous => previous.filter(item => item.id !== id))
  }

  const resetDemo = () => {
    if (!window.confirm("Reset transactions and budgets to the original demo data?")) return
    setTransactions(initialTransactions)
    setBudgets(initialBudgets)
    setBudgetDraft(initialBudgets)
    setSearch("")
    setTypeFilter("all")
    setCategoryFilter("all")
    setForm(blankForm())
    setFormError("")
    setBudgetSaved(false)
    setActivePage("Overview")
    setShowForm(false)
  }

  const saveBudgets = event => {
    event.preventDefault()
    const cleaned = {}
    for (const category of expenseCategories) {
      const value = Number(budgetDraft[category])
      if (!Number.isFinite(value) || value < 0) {
        setBudgetSaved(false)
        return
      }
      cleaned[category] = value
    }
    setBudgets(cleaned)
    setBudgetDraft(cleaned)
    setBudgetSaved(true)
  }

  const openTransactions = () => {
    setActivePage("Transactions")
    setSearch("")
  }

  return (
    <main className="sw-app">
      <aside className="sw-sidebar">
        <a className="sw-brand" href="#overview" onClick={() => setActivePage("Overview")}>
          <span className="sw-brand-mark">s.</span>
          <span>spendwise<small>PERSONAL FINANCE</small></span>
        </a>

        <div className="sw-profile">
          <div className="sw-avatar">U</div>
          <div><strong>My finances</strong><span>Personal workspace</span></div>
          <span className="sw-profile-dot" />
        </div>

        <span className="sw-nav-label">WORKSPACE</span>
        <nav className="sw-nav" aria-label="Main navigation">
          {[
            ["Overview", "◫"],
            ["Transactions", "↕"],
            ["Budgets", "▥"]
          ].map(([page, icon]) => (
            <button key={page} className={"sw-nav-item " + (activePage === page ? "active" : "")} onClick={() => setActivePage(page)}>
              <span>{icon}</span>{page}
              {page === "Transactions" && <span className="sw-nav-count">{transactions.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sw-sidebar-bottom">
          <div className="sw-sidebar-tip">
            <span className="sw-tip-icon">✳</span>
            <strong>Small steps, big savings.</strong>
            <p>Keep track of today to feel more confident about tomorrow.</p>
          </div>
          <button className="sw-reset-button" onClick={resetDemo}>↺ Reset demo data</button>
          <span className="sw-version">SPENDWISE · DAY 09</span>
        </div>
      </aside>

      <section className="sw-main">
        <header className="sw-topbar">
          <div className="sw-breadcrumb">Workspace <span>/</span> <strong>{activePage}</strong></div>
          <div className="sw-top-actions">
            <span className="sw-demo-badge"><i /> Demo workspace</span>
            <button className="sw-add-button" onClick={() => { setShowForm(true); setFormError("") }}>＋ Add transaction</button>
          </div>
        </header>

        <div className="sw-content">
          {activePage === "Overview" && (
            <>
              <section className="sw-welcome">
                <div>
                  <span className="sw-eyebrow">YOUR MONEY, MADE CLEAR</span>
                  <h1>A clearer view of <em>your money.</em></h1>
                  <p>Know what comes in, where it goes, and what you can save.</p>
                </div>
                <div className="sw-welcome-date"><span>TRACKING PERIOD</span><strong>October 2026</strong><span>Sample monthly overview</span></div>
              </section>

              <section className="sw-metrics-grid">
                <MetricCard label="Total balance" value={money(totals.balance)} note="Income minus expenses" icon="↗" tone="sw-metric-primary" />
                <MetricCard label="Total income" value={money(totals.income)} note={transactions.filter(item => item.type === "income").length + " income transactions"} icon="↓" tone="sw-metric-income" />
                <MetricCard label="Total expenses" value={money(totals.expenses)} note={transactions.filter(item => item.type === "expense").length + " expense transactions"} icon="↑" tone="sw-metric-expense" />
                <MetricCard label="Savings rate" value={totals.savings + "%"} note={totals.savings >= 20 ? "You're building a healthy habit" : "Look for room to save more"} icon="◎" tone="sw-metric-savings" />
              </section>

              <div className="sw-dashboard-grid">
                <section className="sw-panel sw-transactions-panel">
                  <SectionHeading eyebrow="LATEST ACTIVITY" title="Recent transactions" action="All transactions" onAction={openTransactions} />
                  <div className="sw-transaction-list">
                    {transactions.length ? [...transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 5).map(item => (
                      <TransactionItem key={item.id} transaction={item} onDelete={deleteTransaction} />
                    )) : <div className="sw-empty">No transactions yet. Add one to get started.</div>}
                  </div>
                  <button className="sw-view-all" onClick={openTransactions}>View all transactions <span>→</span></button>
                </section>

                <section className="sw-panel sw-budget-panel">
                  <SectionHeading eyebrow="SPENDING PLAN" title="Budget overview" action="Manage" onAction={() => setActivePage("Budgets")} />
                  <div className="sw-budget-summary">
                    <span>Total monthly budget</span>
                    <strong>{money(totalBudget)}</strong>
                    <div className="sw-budget-summary-bottom"><span>{money(totalSpent)} spent</span><span>{money(budgetRemaining)} left</span></div>
                    <div className="sw-progress-track"><div className="sw-progress-fill" style={{ width: Math.min(totalBudget ? totalSpent / totalBudget * 100 : 0, 100) + "%" }} /></div>
                  </div>
                  <div className="sw-category-list">
                    {expenseCategories.slice(0, 5).map(category => {
                      const spent = spentByCategory[category] || 0
                      const limit = Number(budgets[category] || 0)
                      const percent = limit ? spent / limit * 100 : spent ? 100 : 0
                      return (
                        <div className="sw-category-row" key={category}>
                          <span className="sw-category-icon">{categoryIcons[category]}</span>
                          <div className="sw-category-info"><div><strong>{category}</strong><span>{money(spent)} / {money(limit)}</span></div><div className="sw-progress-track"><div className={"sw-progress-fill " + (percent > 100 ? "is-over" : "")} style={{ width: Math.min(percent, 100) + "%" }} /></div></div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              </div>

              <section className="sw-insight">
                <div className="sw-insight-icon">✳</div>
                <div><span className="sw-eyebrow">YOUR MONEY INSIGHT</span><h3>{overBudgetCategories.length ? "A budget needs your attention" : "You're in control of your spending"}</h3><p>{overBudgetCategories.length ? overBudgetCategories.join(", ") + " " + (overBudgetCategories.length === 1 ? "is" : "are") + " over the current budget. Review your limits or upcoming expenses." : "You have " + money(Math.max(budgetRemaining, 0)) + " remaining across your monthly category budgets. Keep checking in regularly."}</p></div>
                <button onClick={() => setActivePage("Budgets")}>Review budgets <span>→</span></button>
              </section>
            </>
          )}

          {activePage === "Transactions" && (
            <>
              <section className="sw-page-heading">
                <span className="sw-eyebrow">YOUR MONEY MOVEMENT</span>
                <h1>Transactions<span>.</span></h1>
                <p>Every incoming and outgoing amount, all in one place.</p>
              </section>
              <section className="sw-panel sw-full-panel">
                <div className="sw-list-toolbar">
                  <label className="sw-search"><span>⌕</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search transactions..." aria-label="Search transactions" /></label>
                  <select value={typeFilter} onChange={event => setTypeFilter(event.target.value)} aria-label="Filter by transaction type"><option value="all">All types</option><option value="income">Income</option><option value="expense">Expenses</option></select>
                  <select value={categoryFilter} onChange={event => setCategoryFilter(event.target.value)} aria-label="Filter by category"><option value="all">All categories</option>{categories.map(category => <option key={category} value={category}>{category}</option>)}</select>
                </div>
                <div className="sw-list-result">{filteredTransactions.length} {filteredTransactions.length === 1 ? "transaction" : "transactions"} found</div>
                <div className="sw-transaction-list">
                  {filteredTransactions.length ? filteredTransactions.map(item => <TransactionItem key={item.id} transaction={item} onDelete={deleteTransaction} />) : <div className="sw-empty">No matching transactions. Try another search or filter.</div>}
                </div>
                {(search || typeFilter !== "all" || categoryFilter !== "all") && <button className="sw-clear-filters" onClick={() => { setSearch(""); setTypeFilter("all"); setCategoryFilter("all") }}>Clear all filters</button>}
              </section>
            </>
          )}

          {activePage === "Budgets" && (
            <>
              <section className="sw-page-heading">
                <span className="sw-eyebrow">PLAN WITH PURPOSE</span>
                <h1>Your budgets<span>.</span></h1>
                <p>Set practical monthly limits and keep spending visible.</p>
              </section>
              <div className="sw-budget-overview-grid">
                <article className="sw-budget-stat"><span>Monthly budget</span><strong>{money(totalBudget)}</strong></article>
                <article className="sw-budget-stat"><span>Total spent</span><strong>{money(totalSpent)}</strong></article>
                <article className="sw-budget-stat"><span>Remaining budget</span><strong className={budgetRemaining < 0 ? "sw-negative" : "sw-positive"}>{money(budgetRemaining)}</strong></article>
              </div>
              <form className="sw-panel sw-budget-editor" onSubmit={saveBudgets}>
                <SectionHeading eyebrow="MONTHLY LIMITS" title="Category budgets" />
                <p className="sw-form-intro">Adjust each category to match your plans. Amounts are in Pakistani rupees.</p>
                <div className="sw-budget-edit-grid">
                  {expenseCategories.map(category => {
                    const spent = spentByCategory[category] || 0
                    const limit = Number(budgets[category] || 0)
                    const percent = limit ? spent / limit * 100 : spent ? 100 : 0
                    return (
                      <div className="sw-budget-edit-row" key={category}>
                        <div className="sw-budget-edit-top"><span className="sw-category-icon">{categoryIcons[category]}</span><strong>{category}</strong><span className={spent > limit ? "sw-negative" : ""}>{money(spent)} spent</span></div>
                        <label className="sw-budget-input"><span>Monthly limit (PKR)</span><input type="number" min="0" step="100" value={budgetDraft[category] ?? ""} onChange={event => { setBudgetDraft(previous => ({ ...previous, [category]: event.target.value })); setBudgetSaved(false) }} required /></label>
                        <div className="sw-progress-track"><div className={"sw-progress-fill " + (percent > 100 ? "is-over" : "")} style={{ width: Math.min(percent, 100) + "%" }} /></div>
                        <span className="sw-budget-status">{limit === 0 && spent > 0 ? "No budget set" : percent > 100 ? money(spent - limit) + " over budget" : Math.round(percent) + "% used"}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="sw-budget-form-footer">{budgetSaved && <span className="sw-saved-message">✓ Budgets saved successfully</span>}<button className="sw-add-button" type="submit">Save budgets ↗</button></div>
              </form>
            </>
          )}
        </div>
        <footer className="sw-footer"><span>SpendWise · Personal finance, made clearer.</span><span>Demo data only · No bank connection</span></footer>
      </section>

      {showForm && (
        <div className="sw-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setShowForm(false) }}>
          <section className="sw-modal" role="dialog" aria-modal="true" aria-labelledby="sw-modal-title">
            <div className="sw-modal-heading"><div><span className="sw-eyebrow">RECORD YOUR MONEY</span><h2 id="sw-modal-title">Add transaction</h2></div><button className="sw-modal-close" onClick={() => setShowForm(false)} aria-label="Close form">×</button></div>
            <form onSubmit={addTransaction}>
              <label className="sw-field"><span>Transaction title</span><input autoFocus value={form.title} onChange={event => setForm(previous => ({ ...previous, title: event.target.value }))} placeholder="e.g. Grocery shopping" maxLength="70" required /></label>
              <label className="sw-field"><span>Transaction type</span><select value={form.type} onChange={event => { const type = event.target.value; setForm(previous => ({ ...previous, type, category: type === "income" ? "Salary" : "Food" })) }}><option value="expense">Expense</option><option value="income">Income</option></select></label>
              <label className="sw-field"><span>Category</span><select value={form.category} onChange={event => setForm(previous => ({ ...previous, category: event.target.value }))}>{(form.type === "income" ? ["Salary", "Freelance", "Other"] : expenseCategories).map(category => <option key={category} value={category}>{category}</option>)}</select></label>
              <label className="sw-field"><span>Amount (PKR)</span><input type="number" min="1" step="1" value={form.amount} onChange={event => setForm(previous => ({ ...previous, amount: event.target.value }))} placeholder="0" required /></label>
              <label className="sw-field"><span>Date</span><input type="date" value={form.date} onChange={event => setForm(previous => ({ ...previous, date: event.target.value }))} required /></label>
              {formError && <p className="sw-form-error">{formError}</p>}
              <div className="sw-modal-actions"><button type="button" className="sw-cancel-button" onClick={() => { setShowForm(false); setFormError("") }}>Cancel</button><button className="sw-add-button" type="submit">Save transaction ↗</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}