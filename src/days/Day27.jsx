import React, { useState, useEffect } from "react";
import "./Day27.css";

const initialRegions = [
  { name: "Amazon Basin", type: "Forest", energy: 92, status: "Thriving", color: "green", x: 24, y: 43 },
  { name: "North Atlantic", type: "Ocean", energy: 78, status: "Stable", color: "blue", x: 48, y: 27 },
  { name: "Sahara Belt", type: "Solar", energy: 86, status: "Optimized", color: "brown", x: 56, y: 52 },
  { name: "Himalayan Arc", type: "Hydro", energy: 73, status: "Recovering", color: "green", x: 76, y: 39 },
];

const activities = [
  ["✦", "Solar array connected", "North Africa · Just now"],
  ["◉", "Ocean current optimized", "Atlantic Grid · 2 min ago"],
  ["⌁", "Forest recovery detected", "Amazon Basin · 5 min ago"],
  ["↗", "Hydro output increased", "Himalayan Arc · 8 min ago"],
];

const navItems = ["Overview", "Energy Grid", "Ecosystems", "Atmosphere"];

function Earth() {
  return (
    <div className="earth-scene">
      <div className="earth-glow" />
      <div className="orbit orbit-one"><span /></div>
      <div className="orbit orbit-two"><span /></div>
      <div className="orbit orbit-three"><span /></div>
      <div className="planet-shadow">
        <div className="planet">
          <div className="planet-land land-one" />
          <div className="planet-land land-two" />
          <div className="planet-land land-three" />
          <div className="planet-cloud cloud-one" />
          <div className="planet-cloud cloud-two" />
          <div className="planet-shine" />
        </div>
      </div>
      <div className="earth-label label-top"><span /> LIVE PLANET FEED</div>
      <div className="earth-label label-bottom">EARTH SYSTEM // 001</div>
      <div className="satellite satellite-one">✧</div>
      <div className="satellite satellite-two">✦</div>
    </div>
  );
}

function Metric({ icon, label, value, unit, change, color, delay }) {
  return (
    <article className={`metric-card metric-${color}`} style={{ "--delay": delay }}>
      <div className="metric-top">
        <span className="metric-icon">{icon}</span>
        <span className="metric-change">↗ {change}</span>
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}<small>{unit}</small></div>
      <div className="metric-track"><span /></div>
      <div className="metric-orb" />
    </article>
  );
}

export default function Day27() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [activeRegion, setActiveRegion] = useState("Amazon Basin");
  const [mode, setMode] = useState("Balanced");
  const [intensity, setIntensity] = useState(72);
  const [live, setLive] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selected = initialRegions.find((region) => region.name === activeRegion);

  return (
    <main className="terra-app">
      <div className="ambient ambient-blue" />
      <div className="ambient ambient-green" />
      <div className="ambient ambient-brown" />
      <div className="star-field" />

      <header className="terra-header">
        <a className="brand" href="#home">
          <span className="brand-symbol"><i /><i /><i /></span>
          <span>TERRA<span className="brand-light">FLUX</span><small>PLANETARY INTELLIGENCE</small></span>
        </a>
        <nav className="main-nav">
          {navItems.map((item, index) => (
            <button key={item} className={activeNav === item ? "nav-active" : ""} onClick={() => setActiveNav(item)}>
              <span className="nav-index">0{index + 1}</span>{item}
            </button>
          ))}
        </nav>
        <div className="header-right">
          <span className="system-status"><i /> SYSTEM ONLINE</span>
          <button className="profile-button" onClick={() => setExpanded(!expanded)}>TF <span>⌄</span></button>
        </div>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> THE FUTURE IS REGENERATIVE <span className="eyebrow-star">✳</span></div>
          <h1 className="hero-title">
            <span className="title-line title-line-one">POWERING</span>
            <span className="title-line title-line-two">A LIVING <em>PLANET.</em></span>
          </h1>
          <p className="hero-description">One connected intelligence. A thousand natural systems. Discover the pulse of a planet transforming its future.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => document.getElementById("regions")?.scrollIntoView({ behavior: "smooth" })}>
              EXPLORE THE GRID <span>↗</span>
            </button>
            <button className="secondary-action" onClick={() => setLive(!live)}>
              <span className={live ? "live-dot" : "paused-dot"} /> {live ? "LIVE SIMULATION" : "SIMULATION PAUSED"}
            </button>
          </div>
          <div className="hero-footnote"><span>01 / 04</span><div className="footnote-line"><i /></div><span>PLANETARY OVERVIEW</span></div>
        </div>

        <div className="hero-visual">
          <div className="visual-caption caption-left">GLOBAL<br />ENERGY NETWORK</div>
          <Earth />
          <div className="visual-caption caption-right">LAT 24.86° N<br />LONG 67.00° E</div>
          <div className="visual-coordinates">SCANNING PLANETARY SYSTEM <span>•••</span></div>
        </div>
      </section>

      <section className="metrics-section">
        <div className="section-heading">
          <div><span className="section-kicker">01 — PLANETARY VITALS</span><h2>THE BIG <em>PICTURE.</em></h2></div>
          <span className="updated-label"><i /> LIVE DATA STREAM · {time.toLocaleTimeString()}</span>
        </div>
        <div className="metrics-grid">
          <Metric icon="☼" label="CLEAN ENERGY OUTPUT" value="84.6" unit=" GW" change="+12.8%" color="blue" delay="0s" />
          <Metric icon="❋" label="FOREST COVERAGE" value="68.2" unit="%" change="+4.2%" color="green" delay=".12s" />
          <Metric icon="◈" label="OCEAN HEALTH INDEX" value="91.4" unit=" /100" change="+2.6%" color="brown" delay=".24s" />
          <Metric icon="⌁" label="CARBON REDUCTION" value="42.8" unit=" MT" change="+18.1%" color="blue" delay=".36s" />
        </div>
      </section>

      <section className="operations-section" id="regions">
        <div className="section-heading">
          <div><span className="section-kicker">02 — CONNECTED ECOSYSTEMS</span><h2>THE PLANET <em>IN MOTION.</em></h2></div>
          <span className="updated-label">SELECT A REGION TO ANALYZE ↘</span>
        </div>
        <div className="operations-grid">
          <div className="region-panel clay-panel">
            <div className="panel-heading">
              <div><span className="panel-kicker">GLOBAL NETWORK</span><h3>Regional <em>Pulse</em></h3></div>
              <span className="live-tag"><i /> LIVE</span>
            </div>
            <div className="network-map">
              <div className="map-grid" />
              <svg className="network-lines" viewBox="0 0 600 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="routeGradient"><stop offset="0%" stopColor="#4bd6d1" /><stop offset="100%" stopColor="#a2e87c" /></linearGradient>
                </defs>
                <path d="M145 135 Q250 15 330 82 T470 118" />
                <path d="M145 135 Q180 235 335 210 T470 118" />
                <path d="M330 82 Q390 155 335 210" />
                <path d="M145 135 Q290 170 470 118" />
                <circle r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M145 135 Q250 15 330 82 T470 118" /></circle>
                <circle r="3"><animateMotion dur="5s" repeatCount="indefinite" path="M145 135 Q180 235 335 210 T470 118" /></circle>
                <circle r="3"><animateMotion dur="6s" repeatCount="indefinite" path="M330 82 Q390 155 335 210" /></circle>
                <circle r="3"><animateMotion dur="4.5s" repeatCount="indefinite" path="M145 135 Q290 170 470 118" /></circle>
              </svg>
              {initialRegions.map((region) => (
                <button key={region.name} className={`map-node node-${region.color} ${activeRegion === region.name ? "node-selected" : ""}`} style={{ left: `${region.x}%`, top: `${region.y}%` }} onClick={() => setActiveRegion(region.name)}>
                  <i /><span>{region.name}</span>
                </button>
              ))}
              <div className="map-center">TERRA<br />CORE</div>
              <div className="map-scale">GLOBAL GRID / 4 ACTIVE NODES</div>
            </div>
            <div className="region-details">
              <div><span>SELECTED REGION</span><strong>{selected.name}</strong></div>
              <div><span>ENERGY INDEX</span><strong>{selected.energy}<small>%</small></strong></div>
              <div><span>STATUS</span><strong className="status-green">{selected.status}</strong></div>
            </div>
          </div>

          <div className="control-panel clay-panel">
            <div className="panel-heading">
              <div><span className="panel-kicker">INTELLIGENCE ENGINE</span><h3>Energy <em>Control</em></h3></div>
              <span className="control-orbit">✳</span>
            </div>
            <div className="control-intro">Tune the planetary energy distribution. Every adjustment reshapes the live simulation.</div>
            <div className="control-label"><span>ENERGY DISTRIBUTION</span><strong>{intensity}%</strong></div>
            <input className="energy-slider" type="range" min="0" max="100" value={intensity} onChange={(event) => setIntensity(Number(event.target.value))} style={{ "--range": `${intensity}%` }} />
            <div className="range-labels"><span>CONSERVE</span><span>MAXIMUM OUTPUT</span></div>
            <div className="control-label mode-label"><span>OPERATION MODE</span><strong>SELECT PROFILE</strong></div>
            <div className="mode-options">
              {["Balanced", "Regenerative", "Maximum"].map((option, index) => (
                <button key={option} className={`mode-option ${mode === option ? "mode-selected" : ""}`} onClick={() => setMode(option)}>
                  <span className="mode-icon">{["◉", "❋", "↗"][index]}</span><span>{option}</span><i>{mode === option ? "●" : "○"}</i>
                </button>
              ))}
            </div>
            <button className="apply-button" onClick={() => setExpanded(!expanded)}>{expanded ? "CONFIGURATION APPLIED ✓" : "APPLY CONFIGURATION"} <span>↗</span></button>
          </div>
        </div>
      </section>

      <section className="activity-section">
        <div className="section-heading">
          <div><span className="section-kicker">03 — SYSTEM TELEMETRY</span><h2>PLANETARY <em>ACTIVITY.</em></h2></div>
          <span className="updated-label">AUTOMATED EVENT STREAM</span>
        </div>
        <div className="activity-grid">
          <div className="activity-feed clay-panel">
            {activities.map((activity, index) => (
              <div className="activity-row" key={activity[1]} style={{ "--delay": `${index * .15}s` }}>
                <span className="activity-icon">{activity[0]}</span>
                <div><strong>{activity[1]}</strong><small>{activity[2]}</small></div>
                <span className="activity-arrow">↗</span>
              </div>
            ))}
          </div>
          <div className="impact-card">
            <div className="impact-orb"><span>✳</span></div>
            <span className="panel-kicker">OUR COLLECTIVE IMPACT</span>
            <div className="impact-number">2.48<small>M</small></div>
            <h3>TREES PROTECTED</h3>
            <p>Every connected system makes a difference. Every action creates a ripple.</p>
            <div className="impact-progress"><span /></div>
            <div className="impact-bottom"><span>ANNUAL TARGET</span><strong>76.4%</strong></div>
          </div>
        </div>
      </section>

      <footer className="terra-footer">
        <div className="footer-brand">TERRA<span>FLUX</span> <i>✳</i></div>
        <p>DESIGNED FOR A PLANET THAT NEVER STOPS MOVING.</p>
        <span>EARTH SYSTEMS INTELLIGENCE © 2026</span>
      </footer>
    </main>
  );
}
