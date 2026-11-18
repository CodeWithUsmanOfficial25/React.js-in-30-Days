const routes = [
  { d: "M118 145 Q250 12 380 130", color: "#66e5a2", delay: "0s" },
  { d: "M118 145 Q470 35 650 165", color: "#f0b45e", delay: ".8s" },
  { d: "M380 130 Q530 65 650 165", color: "#ee716b", delay: "1.4s" },
  { d: "M260 275 Q390 190 520 220", color: "#66e5a2", delay: "2s" },
  { d: "M650 165 Q760 105 805 235", color: "#ee716b", delay: "2.6s" },
  { d: "M520 220 Q690 270 805 235", color: "#f0b45e", delay: "3.2s" },
  { d: "M380 130 Q360 240 260 275", color: "#ee716b", delay: "3.8s" },
  { d: "M118 145 Q170 230 260 275", color: "#f0b45e", delay: "4.4s" }
];
const nodes = [
  { x: 118, y: 145, name: "San Francisco", type: "source" },
  { x: 260, y: 275, name: "São Paulo", type: "target" },
  { x: 380, y: 130, name: "London", type: "source" },
  { x: 520, y: 220, name: "Dubai", type: "target" },
  { x: 650, y: 165, name: "Singapore", type: "source" },
  { x: 805, y: 235, name: "Tokyo", type: "target" }
];
export default function ThreatMap() {
  return <section className="td-panel world-threat-panel">
    <div className="panel-heading"><div><span className="panel-kicker">GLOBAL THREAT INTELLIGENCE</span><h2>Live threat map</h2><p>Simulated attack routes and monitored network activity worldwide</p></div><span className="live-pill"><i /> LIVE TRACKING</span></div>
    <div className="world-map-stage"><div className="world-map-grid" />
      <svg className="world-map-svg" viewBox="0 0 900 390" role="img" aria-label="World map with animated simulated cyber attack routes">
        <defs>
          <linearGradient id="landGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1b4936"/><stop offset="100%" stopColor="#102d24"/></linearGradient>
          <filter id="routeGlow"><feGaussianBlur stdDeviation="3.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <pattern id="mapDots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.15" fill="#6a9d7d" opacity=".44"/></pattern>
        </defs>
        <g className="map-land" fill="url(#landGradient)" stroke="#376c50" strokeWidth="1.1">
          <path d="M55 88 L83 56 128 45 158 55 183 48 215 65 237 87 224 112 199 121 190 145 167 158 159 185 135 198 121 230 101 218 90 188 68 175 55 143 39 121Z"/>
          <path d="M190 207 L218 214 235 242 229 273 213 309 197 339 181 319 174 287 160 263 166 233Z"/>
          <path d="M350 78 L374 62 408 65 429 79 449 76 468 91 461 108 438 112 425 129 399 132 384 118 363 115 344 98Z"/>
          <path d="M395 139 L426 134 452 151 467 179 454 213 440 245 418 268 397 245 384 214 374 183 379 156Z"/>
          <path d="M465 84 L504 61 552 56 593 70 627 65 665 79 697 69 736 87 775 104 809 132 797 157 763 162 746 181 716 175 691 193 665 184 642 199 614 184 585 177 562 155 533 154 513 133 484 129Z"/>
          <path d="M707 218 L737 211 766 222 790 243 781 268 750 277 724 260 709 240Z"/>
          <path d="M315 44 L328 35 342 43 337 58 323 60Z"/><path d="M833 283 L847 277 858 289 850 302 837 299Z"/>
        </g>
        <g fill="url(#mapDots)" opacity=".8">
          <path d="M55 88 L83 56 128 45 158 55 183 48 215 65 237 87 224 112 199 121 190 145 167 158 159 185 135 198 121 230 101 218 90 188 68 175 55 143 39 121Z"/>
          <path d="M190 207 L218 214 235 242 229 273 213 309 197 339 181 319 174 287 160 263 166 233Z"/>
          <path d="M350 78 L374 62 408 65 429 79 449 76 468 91 461 108 438 112 425 129 399 132 384 118 363 115 344 98Z"/>
          <path d="M395 139 L426 134 452 151 467 179 454 213 440 245 418 268 397 245 384 214 374 183 379 156Z"/>
          <path d="M465 84 L504 61 552 56 593 70 627 65 665 79 697 69 736 87 775 104 809 132 797 157 763 162 746 181 716 175 691 193 665 184 642 199 614 184 585 177 562 155 533 154 513 133 484 129Z"/>
          <path d="M707 218 L737 211 766 222 790 243 781 268 750 277 724 260 709 240Z"/>
        </g>
        <g className="route-lines">{routes.map((route,index)=><g key={index}>
          <path d={route.d} fill="none" stroke={route.color} strokeWidth="1.5" opacity=".38"/>
          <path d={route.d} fill="none" stroke={route.color} strokeWidth="1" strokeDasharray="5 13" opacity=".8"/>
          <circle r="4" fill={route.color} filter="url(#routeGlow)"><animateMotion dur="4.8s" begin={route.delay} repeatCount="indefinite" path={route.d}/></circle>
          <circle r="2" fill="#fff"><animateMotion dur="4.8s" begin={route.delay} repeatCount="indefinite" path={route.d}/></circle>
        </g>)}</g>
        <g className="map-nodes">{nodes.map((node,index)=><g key={node.name} className={`map-node map-node-${node.type}`}>
          <circle cx={node.x} cy={node.y} r="12" fill={node.type==="source"?"#ed746b":"#65dfa0"} opacity=".12"><animate attributeName="r" values="9;19;9" dur={`${2.4+index*.2}s`} repeatCount="indefinite"/><animate attributeName="opacity" values=".3;0;.3" dur={`${2.4+index*.2}s`} repeatCount="indefinite"/></circle>
          <circle cx={node.x} cy={node.y} r="4.5" fill={node.type==="source"?"#f07870":"#70e5a7"} stroke="#e8fff2" strokeWidth="1"/>
          <text x={node.x+10} y={node.y-11}>{node.name}</text>
        </g>)}</g>
      </svg>
      <div className="map-overlay-stat"><span className="map-stat-dot"/> 8 ROUTES ACTIVE <b>·</b> 6 GLOBAL NODES</div>
      <div className="map-scale">GLOBAL NETWORK / SIMULATED TELEMETRY</div>
    </div>
    <div className="world-map-legend"><span><i className="legend-red"/> Attack origin</span><span><i className="legend-green"/> Protected destination</span><span><i className="legend-amber"/> Data transfer route</span><strong>Routes update continuously</strong></div>
  </section>;
}
