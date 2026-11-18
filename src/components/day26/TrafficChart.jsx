export default function TrafficChart({ values }) {
  const points = values.map((value, index) => `${index * 20},${110 - value}`).join(" ");
  const area = `0,110 ${points} 460,110`;
  return (
    <div className="traffic-chart">
      <div className="chart-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
      <svg viewBox="0 0 460 120" preserveAspectRatio="none" role="img" aria-label="Network threat activity chart">
        <defs>
          <linearGradient id="threatArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f06a65" stopOpacity=".34" />
            <stop offset="100%" stopColor="#f06a65" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="threatLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#e5a34c" />
            <stop offset="100%" stopColor="#ef6c69" />
          </linearGradient>
        </defs>
        {[10, 35, 60, 85, 110].map(y => <line key={y} x1="0" x2="460" y1={y} y2={y} stroke="#344253" strokeDasharray="3 5" />)}
        <polygon points={area} fill="url(#threatArea)" />
        <polyline points={points} fill="none" stroke="url(#threatLine)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        {values.map((value, index) => <circle key={index} cx={index * 20} cy={110 - value} r="2.4" fill="#f08a73" />)}
      </svg>
      <div className="chart-times"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>Now</span></div>
    </div>
  );
}
