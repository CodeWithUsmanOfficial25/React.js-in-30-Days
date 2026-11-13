import React, { useEffect, useMemo, useState } from "react";
import CreatureCard from "../components/day21/CreatureCard";
import { creatures, habitats, oceanGallery, oceanStats } from "../data/day21Data";
import "./Day21.css";

export default function Day21() {
  const [activeHabitat, setActiveHabitat] = useState("All");
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [search, setSearch] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredCreatures = useMemo(() => {
    return creatures.filter((creature) => {
      const matchesHabitat = activeHabitat === "All" || creature.habitat === activeHabitat;
      const matchesSearch = `${creature.name} ${creature.habitat} ${creature.scientific}`.toLowerCase().includes(search.toLowerCase());
      return matchesHabitat && matchesSearch;
    });
  }, [activeHabitat, search]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.background = "#071d2b";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const moveTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 24}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 24}px`);
  };

  return (
    <main className="aquaria">
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }} />

      <nav className="ocean-nav">
        <a className="ocean-brand" href="#home" onClick={(event) => { event.preventDefault(); moveTo("home"); }}>
          <span className="brand-symbol">◉</span>
          <span>AQUARIA<span className="brand-period">.</span></span>
        </a>
        <div className="nav-links">
          <button onClick={() => moveTo("discover")}>Discover</button>
          <button onClick={() => moveTo("habitats")}>Habitats</button>
          <button onClick={() => moveTo("gallery")}>Gallery</button>
        </div>
        <button className="nav-explore" onClick={() => moveTo("discover")}>Explore ocean <span>↗</span></button>
      </nav>

      <section className="ocean-hero" id="home" onMouseMove={handleHeroMove}>
        <div className="hero-backdrop" />
        <div className="hero-grain" />
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-bubbles" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--bubble-index": index }} />)}
        </div>
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> THE WORLD BENEATH THE WAVES</div>
          <h1>Explore the<br /><em>blue unknown.</em></h1>
          <p className="hero-description">A living atlas of extraordinary marine life, hidden ecosystems and the wonders of our blue planet.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => moveTo("discover")}>Start exploring <span>↗</span></button>
            <button className="secondary-action" onClick={() => moveTo("gallery")}><span className="play-icon">▷</span> View gallery</button>
          </div>
          <div className="hero-footnote"><span className="footnote-line" /> 70% OF OUR PLANET IS STILL WAITING TO BE DISCOVERED</div>
        </div>
        <div className="hero-side-note">OCEAN / 001 — THE BLUE PLANET</div>
        <div className="hero-scroll" onClick={() => moveTo("discover")}><span /> SCROLL TO DIVE</div>
        <div className="hero-float-card">
          <div className="float-card-image" />
          <div><span>FEATURED SPECIES</span><strong>Manta Ray</strong><small>Gentle giant of the sea</small></div>
          <span className="float-card-arrow">↗</span>
        </div>
        <div className="hero-depth">0 M <span>━━━━━━━━</span> 11,000 M</div>
      </section>

      <section className="stats-strip">
        {oceanStats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-icon">{stat.icon}</span>
            <div><strong>{stat.value}</strong><span>{stat.label}</span></div>
          </div>
        ))}
        <div className="stats-note">ONE PLANET.<br /><span>INFINITE WONDERS.</span></div>
      </section>

      <section className="discover-section section-shell" id="discover">
        <div className="section-heading">
          <div>
            <div className="eyebrow dark-eyebrow"><span className="eyebrow-dot" /> MEET THE LOCALS</div>
            <h2>Life in the <em>deep blue.</em></h2>
            <p>From vibrant reefs to the mysterious deep, meet the incredible creatures that call our oceans home.</p>
          </div>
          <div className="heading-counter"><strong>06</strong><span>SPECIES<br />FEATURED</span></div>
        </div>

        <div className="discovery-toolbar">
          <div className="habitat-filters">
            {habitats.map((habitat) => (
              <button key={habitat} className={activeHabitat === habitat ? "filter-chip active" : "filter-chip"} onClick={() => setActiveHabitat(habitat)}>{habitat}</button>
            ))}
          </div>
          <label className="ocean-search">
            <span>⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a species..." />
          </label>
        </div>

        <div className="creature-grid">
          {filteredCreatures.map((creature, index) => (
            <CreatureCard key={creature.id} creature={creature} index={index} onSelect={setSelectedCreature} />
          ))}
        </div>
        {filteredCreatures.length === 0 && <div className="empty-state">No ocean explorers found. Try another search.</div>}
      </section>

      <section className="habitat-section" id="habitats">
        <div className="habitat-inner">
          <div className="habitat-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> A WORLD OF ECOSYSTEMS</div>
            <h2>Every depth<br />has a <em>story.</em></h2>
            <p>The ocean is not one place. It is a collection of extraordinary worlds, each with its own rhythm, color and life.</p>
            <button className="habitat-button" onClick={() => { setActiveHabitat("Deep Sea"); moveTo("discover"); }}>Discover deep sea <span>↗</span></button>
            <div className="habitat-coordinate">24° 08' 12.4" N &nbsp; 67° 01' 32.8" E</div>
          </div>
          <div className="habitat-visual">
            <div className="habitat-photo" />
            <div className="habitat-ring ring-one" />
            <div className="habitat-ring ring-two" />
            <div className="habitat-depth-card"><span>THE DEEPEST POINT</span><strong>10,935<span>m</span></strong><small>Challenger Deep · Mariana Trench</small></div>
            <div className="habitat-float-label">ABYSSAL ZONE <span>↓</span></div>
          </div>
        </div>
      </section>

      <section className="gallery-section section-shell" id="gallery">
        <div className="section-heading gallery-heading">
          <div>
            <div className="eyebrow dark-eyebrow"><span className="eyebrow-dot" /> POSTCARDS FROM THE OCEAN</div>
            <h2>Beauty without <em>boundaries.</em></h2>
            <p>A glimpse into the extraordinary landscapes hidden beneath the surface.</p>
          </div>
          <span className="gallery-index">01 — 03 / VISUAL JOURNAL</span>
        </div>
        <div className="ocean-gallery">
          {oceanGallery.map((item, index) => (
            <article className={`gallery-card gallery-card-${index + 1}`} key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="gallery-overlay" />
              <span className="gallery-number">0{index + 1}</span>
              <div className="gallery-caption"><span>{item.subtitle}</span><h3>{item.title}</h3></div>
              <span className="gallery-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="conservation-section">
        <div className="conservation-image" />
        <div className="conservation-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> PROTECT WHAT WE LOVE</div>
          <h2>The ocean needs<br /><em>our voice.</em></h2>
          <p>Every small action can help protect the ecosystems that sustain life on Earth. Learn, share and make a difference.</p>
          <button className="conservation-button" onClick={() => window.open("https://oceanservice.noaa.gov/ocean/", "_blank", "noopener,noreferrer")}>Learn about our oceans <span>↗</span></button>
        </div>
        <div className="conservation-stamp">BLUE<br />IS THE<br />FUTURE<span>✳</span></div>
      </section>

      <footer className="ocean-footer">
        <a className="ocean-brand footer-brand" href="#home" onClick={(event) => { event.preventDefault(); moveTo("home"); }}><span className="brand-symbol">◉</span><span>AQUARIA<span className="brand-period">.</span></span></a>
        <span>AN INTERACTIVE JOURNEY INTO THE BLUE.</span>
        <span>DAY 21 / REACT.JS IN 30 DAYS</span>
        <button onClick={() => moveTo("home")}>BACK TO SURFACE ↑</button>
      </footer>

      {selectedCreature && (
        <div className="species-modal-backdrop" onClick={() => setSelectedCreature(null)}>
          <div className="species-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCreature(null)}>×</button>
            <img src={selectedCreature.image} alt={selectedCreature.name} />
            <div className="modal-copy">
              <span className="creature-habitat">{selectedCreature.habitat} · {selectedCreature.depth}</span>
              <h2>{selectedCreature.name}</h2>
              <i>{selectedCreature.scientific}</i>
              <p>{selectedCreature.description}</p>
              <span className="modal-status">CONSERVATION STATUS: {selectedCreature.status}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
