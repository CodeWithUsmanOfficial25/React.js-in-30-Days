import { useState } from "react";
import GalaxyScene from "../components/day17/GalaxyScene";
import "./Day17.css";

const discoveries = [
  { number: "01", title: "Stellar Core", detail: "A glowing heart powering the cosmic spiral." },
  { number: "02", title: "Orbital Paths", detail: "Celestial bodies moving through infinite space." },
  { number: "03", title: "Deep Space", detail: "Thousands of stars scattered across the universe." }
];

export default function Day17() {
  const [exploring, setExploring] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <main className="cosmos-page">
      <div className="cosmos-noise" />
      <nav className="cosmos-nav">
        <a className="cosmos-brand" href="#home">
          <span className="brand-mark">✦</span>
          COSMOS<span className="brand-dot">.</span>
        </a>
        <div className="nav-center">AN INTERACTIVE UNIVERSE</div>
        <a className="nav-index" href="#discover">EXPLORE <span>↗</span></a>
      </nav>

      <section className="cosmos-hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> BEYOND THE KNOWN UNIVERSE</div>
          <h1>Discover the<br /><span>infinite</span> beyond.</h1>
          <p className="hero-description">
            A journey through distant stars, cosmic dust and the beautiful chaos of the universe.
          </p>
          <button className="explore-button" onClick={() => {
            setExploring(true);
            document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" });
          }}>
            <span>{exploring ? "JOURNEY STARTED" : "START EXPLORING"}</span>
            <span className="button-arrow">↗</span>
          </button>
          <div className="hero-meta">
            <span>01 — 03</span>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        <div className="galaxy-stage">
          <GalaxyScene />
          <div className="stage-label stage-top">FIG. 001 / THE COSMIC SPIRAL</div>
          <div className="stage-label stage-bottom">MILKY WAY SYSTEM <span>• LIVE SIMULATION</span></div>
          <div className="coordinate coordinate-one">RA 18h 36m<br />DEC +38° 47'</div>
          <div className="coordinate coordinate-two">SPACE<br />01 / 2026</div>
        </div>
        <div className="hero-side-note">AN UNENDING EXPEDITION INTO SPACE</div>
        <div className="scroll-indicator"><span /> SCROLL</div>
      </section>

      <section className="cosmos-stats">
        <div><span className="stat-value">100B+</span><span className="stat-label">GALAXIES ESTIMATED</span></div>
        <div><span className="stat-value">13.8B</span><span className="stat-label">YEARS OF COSMIC HISTORY</span></div>
        <div><span className="stat-value">∞</span><span className="stat-label">POSSIBILITIES AHEAD</span></div>
      </section>

      <section className="discover-section" id="discover">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="live-dot" /> THE COSMIC COLLECTION</div>
            <h2>Explore the <span>unknown.</span></h2>
          </div>
          <p>Every point of light has a story.<br />Every orbit has a destination.</p>
        </div>
        <div className="discovery-grid">
          {discoveries.map((item, index) => (
            <button
              className={`discovery-card ${active === index ? "selected" : ""}`}
              key={item.number}
              onClick={() => setActive(index)}
            >
              <span className="card-number">{item.number}</span>
              <span className="card-icon">{["✧", "◎", "✦"][index]}</span>
              <span className="card-title">{item.title}</span>
              <span className="card-detail">{item.detail}</span>
              <span className="card-link">{active === index ? "CURRENT SELECTION" : "DISCOVER MORE"} ↗</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="cosmos-footer">
        <a className="cosmos-brand" href="#home"><span className="brand-mark">✦</span> COSMOS<span className="brand-dot">.</span></a>
        <span>MADE TO EXPLORE THE INFINITE</span>
        <span>DAY 17 / REACT.JS IN 30 DAYS</span>
      </footer>
    </main>
  );
}
