export default function SpendChart({ data, period }) {
  const values = period === "Quarterly" ? data.map(item => ({ ...item, value: Math.round(item.value * 2.8) })) : data
  const visible = values.slice(0, period === "Quarterly" ? 12 : 30)
  const max = Math.max(...visible.map(item => item.value))

  return (
    <div className="spend-chart">
      <div className="chart-y-labels">
        <span>$900</span><span>$675</span><span>$450</span><span>$225</span><span>$0</span>
      </div>
      <div className="chart-plot">
        <div className="chart-gridlines"><i /><i /><i /><i /><i /></div>
        <div className="chart-bars">
          {visible.map((item, index) => (
            <div className="chart-bar-wrap" key={item.day}>
              <div className={`chart-bar ${index === visible.length - 1 ? "bar-highlight" : ""}`} style={{ height: `${Math.max(5, item.value / max * 100)}%` }} title={`Day ${item.day}: $${item.value}`} />
              {(index % (period === "Quarterly" ? 1 : 5) === 0 || index === visible.length - 1) && <span>{item.day}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
