import { formatDate, money } from "../../data/day09Data"

export default function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === "income"

  return (
    <article className="sw-transaction">
      <div className={"sw-transaction-icon " + (isIncome ? "is-income" : "is-expense")}>
        {isIncome ? "↙" : "↗"}
      </div>
      <div className="sw-transaction-details">
        <strong>{transaction.title}</strong>
        <span>{transaction.category} · {formatDate(transaction.date)}</span>
      </div>
      <div className="sw-transaction-amount">
        <strong className={isIncome ? "sw-positive" : "sw-negative"}>
          {isIncome ? "+" : "−"}{money(transaction.amount)}
        </strong>
        <span>{isIncome ? "Income" : "Expense"}</span>
      </div>
      <button className="sw-delete" onClick={() => onDelete(transaction.id)} aria-label={"Delete " + transaction.title} title="Delete transaction">×</button>
    </article>
  )
}