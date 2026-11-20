import React, { useEffect, useState } from "react";
import OrbitCore from "../components/day28/OrbitCore";
import SignalCard from "../components/day28/SignalCard";
import { nebulaStats, missions, signalFeed } from "../data/day28Data";
import "./Day28.css";

const tabs = ["Discover", "Universe", "Missions", "Signals"];

export default function Day28() {
  const [activeTab, setActiveTab] = useState("Discover");
  const [selectedMode, setSelectedMode] = useState("Explore");
  const [power, setPower] = useState(76);
  const [boost, setBoost] = useState(false);
  const [time, setTime] = useState(new Date());
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const clock = setInterval(() => setTime(new Date()), 1000);
    const feed = setInterval(() => setFeedIndex((current) => (current + 1) % signalFeed.length), 3200);
    return () => {
      clearInterval(clock);
      clearInterval(feed);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="nebula-app">
      <div className="nebula-bg nebula-bg-one" />
      <div className="nebula-bg nebula-bg-two" />
      <div className="nebula-bg nebula-bg-three" />
      <div className="nebula-noise" />
      <div className="nebula-light-beam beam-one" />
      <div className="nebula-light-beam beam-two" />

      <header className="nebula-header">
        <a className="nebula-logo" href="#top">
          <span className="logo-emblem"><i /><i /><i /></span>
          <span>NEBULA<small>INFINITE SPACE SYSTEMS</small></span>
        </a>
        <nav className="nebula-nav">
          {tabs.map((tab, index) => (
            <button key={tab} className={activeTab === tab ? "nebula-tab active-tab" : "nebula-tab"} onClick={() => { setActiveTab(tab); scrollTo(index === 2 ? "missions" : index === 3 ? "signals" : "top"); }}>
              <span>0{index + 1}</span>{tab}
            </button>
          ))}
        </nav>
        <div className="nebula-header-right">
          <span className="nebula-live"><i /> LIVE SYSTEM</span>
          <button className="nebula-avatar" onClick={() => setBoost(!boost)}>N<span>✦</span></button>
        </div>
      </header>

      <section className="nebula-hero" id="top">
        <div className="hero-left">
          <div className="hero-overline"><span className="overline-line" /> THE NEXT FRONTIER IS HERE <span className="overline-spark">✦</span></div>
          <h1 className="nebula-heading">
            <span className="heading-word word-one">BEYOND</span>
            <span className="heading-word word-two">THE <em>KNOWN.</em></span>
            <span className="heading-word word-three">INTO <b>INFINITE.</b></span>
          </h1>
          <p className="nebula-intro">A new dimension of exploration. Discover cosmic worlds, unlock hidden signals and experience the universe in motion.</p>
          <div className="nebula-hero-actions">
            <button className="nebula-primary" onClick={() => scrollTo("missions")}>START EXPLORING <span>↗</span></button>
            <button className="nebula-ghost" onClick={() => setBoost(!boost)}><span className={boost ? "boost-active" : ""}>✧</span>{boost ? "BOOST ACTIVATED" : "ACTIVATE COSMIC BOOST"}</button>
          </div>
          <div className="hero-foot"><span>01 — 04</span><div><i /></div><span>UNIVERSE OVERVIEW</span></div>
        </div>
        <div className="hero-right">
          <div className="hero-orbit-word word-float-one">DISCOVER</div>
          <div className="hero-orbit-word word-float-two">EXPLORE</div>
          <OrbitCore />
          <div className="hero-coordinate-box"><span>COORDINATES</span><strong>40° 44' 55.2"N</strong><strong>73° 59' 11.4"W</strong></div>
        </div>
      </section>

      <div className="marquee-band">
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index}>EXPLORE THE UNKNOWN <b>✦</b> INFINITE POSSIBILITIES <b>✧</b> BEYOND LIMITS <b>◉</b> COSMIC INTELLIGENCE <b>✦</b></span>
          ))}
        </div>
      </div>

      <section className="nebula-stats-section">
        <div className="nebula-section-head">
          <div><span className="nebula-kicker">01 / COSMIC INTELLIGENCE</span><h2>THE UNIVERSE <em>AT A GLANCE.</em></h2></div>
          <span className="nebula-clock"><i /> {time.toLocaleTimeString()}</span>
        </div>
        <div className="nebula-stats-grid">
          {nebulaStats.map((stat, index) => (
            <article className={`nebula-stat stat-${stat.tone}`} key={stat.label} style={{ "--stat-index": index }}>
              <div className="stat-top"><span className="stat-icon">{stat.icon}</span><span className="stat-change">↗ {stat.change}</span></div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}<small>{stat.unit}</small></div>
              <div className="stat-line"><i /></div>
              <div className="stat-decoration" />
            </article>
          ))}
        </div>
      </section>

      <section className="missions-section" id="missions">
        <div className="nebula-section-head">
          <div><span className="nebula-kicker">02 / ACTIVE OPERATIONS</span><h2>MISSIONS IN <em>MOTION.</em></h2></div>
          <button className="view-all" onClick={() => setActiveTab("Missions")}>ALL MISSIONS <span>↗</span></button>
        </div>
        <div className="missions-grid">
          {missions.map((mission, index) => <SignalCard key={mission.id} item={mission} index={index} />)}
        </div>
      </section>

      <section className="control-section" id="universe">
        <div className="nebula-section-head">
          <div><span className="nebula-kicker">03 / QUANTUM ENGINE</span><h2>CONTROL YOUR <em>UNIVERSE.</em></h2></div>
          <span className="control-status"><i /> ENGINE READY</span>
        </div>
        <div className="control-layout">
          <div className="control-visual">
            <div className="control-ring ring-outer" />
            <div className="control-ring ring-middle" />
            <div className="control-ring ring-inner" />
            <div className="control-core">{boost ? "BOOST" : "N"}<span>CORE</span></div>
            <div className="control-star star-one">✦</div><div className="control-star star-two">✧</div><div className="control-star star-three">✦</div>
          </div>
          <div className="control-console">
            <div className="console-top"><span>QUANTUM CONFIGURATION</span><span>SYS.028</span></div>
            <h3>Set your <em>trajectory.</em></h3>
            <p>Adjust the energy output and choose your exploration profile.</p>
            <div className="power-row"><label>ENERGY OUTPUT</label><strong>{power}%</strong></div>
            <input className="power-slider" type="range" min="0" max="100" value={power} onChange={(event) => setPower(Number(event.target.value))} style={{ "--power": `${power}%` }} />
            <div className="power-labels"><span>LOW ORBIT</span><span>MAXIMUM POWER</span></div>
            <div className="profile-label">EXPLORATION PROFILE</div>
            <div className="profile-options">
              {["Explore", "Research", "Hyperdrive"].map((mode, index) => (
                <button key={mode} className={selectedMode === mode ? "profile-option profile-selected" : "profile-option"} onClick={() => setSelectedMode(mode)}>
                  <span>{["✧", "◈", "⚡"][index]}</span>{mode}<i>{selectedMode === mode ? "●" : "○"}</i>
                </button>
              ))}
            </div>
            <button className="console-apply" onClick={() => setBoost(!boost)}>{boost ? "COSMIC BOOST ENGAGED ✓" : "ENGAGE CONFIGURATION"} <span>↗</span></button>
          </div>
        </div>
      </section>

      <section className="signals-section" id="signals">
        <div className="nebula-section-head">
          <div><span className="nebula-kicker">04 / TRANSMISSION LOG</span><h2>INCOMING <em>SIGNALS.</em></h2></div>
          <span className="signal-live"><i /> AUTO STREAM</span>
        </div>
        <div className="signal-layout">
          <div className="signal-feed">
            {signalFeed.map((signal, index) => (
              <div className={`signal-feed-row ${feedIndex === index ? "feed-highlight" : ""}`} key={signal.title}>
                <span className="feed-icon">{signal.icon}</span>
                <div><strong>{signal.title}</strong><small>{signal.detail}</small></div>
                <time>{signal.time}</time>
                <span className="feed-arrow">↗</span>
              </div>
            ))}
          </div>
          <div className="signal-side-card">
            <div className="side-planet"><div /></div>
            <span className="nebula-kicker">THE NEXT DISCOVERY</span>
            <h3>THE UNKNOWN<br /><em>AWAITS YOU.</em></h3>
            <p>There is always another world to discover.</p>
            <button onClick={() => scrollTo("top")}>RETURN TO ORBIT ↑</button>
          </div>
        </div>
      </section>

      <footer className="nebula-footer">
        <a className="nebula-logo" href="#top"><span className="logo-emblem"><i /><i /><i /></span><span>NEBULA<small>INFINITE SPACE SYSTEMS</small></span></a>
        <div className="footer-center">THE UNIVERSE NEVER STANDS STILL.</div>
        <div className="footer-copy">COSMIC EXPERIENCE STUDIO © 2026</div>
      </footer>
    </main>
  );
}
