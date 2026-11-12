import { useState } from "react";
import { gardenHighlights, gardenStats } from "../data/day20Data";
import "./Day20.css";
import BlossomMark from "../components/day20/BlossomMark";

const petals = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  delay: `${-((i * 13) % 25)}s`,
  duration: `${13 + ((i * 7) % 18)}s`,
  drift: `${((i * 19) % 260) - 130}px`,
  size: `${9 + ((i * 11) % 14)}px`,
  opacity: 0.45 + ((i * 7) % 50) / 100
}));

function PetalFall() {
  return (
    <div className="petal-layer" aria-hidden="true">
      {petals.map((petal) => (
        <span
          className="falling-petal"
          key={petal.id}
          style={{
            "--left": petal.left,
            "--delay": petal.delay,
            "--duration": petal.duration,
            "--drift": petal.drift,
            "--size": petal.size,
            "--opacity": petal.opacity
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const exploreGarden = () => {
    document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bloomscape">
      <PetalFall />

      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />

        <header className="navbar">
          <a className="brand" href="#home">
            <BlossomMark />
            <span>BLOOM<span className="brand-light">SCAPE</span></span>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#discover" onClick={() => setMenuOpen(false)}>Discover</a>
            <a href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Our story</a>
          </nav>

          <a className="nav-cta" href="#discover">Explore nature <span>↗</span></a>
        </header>

        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            A LITTLE CLOSER TO NATURE
          </div>

          <h1>
            Let the world
            <br />
            <span>blossom</span> around you.
          </h1>

          <p className="hero-description">
            Find stillness in the forest, beauty in every petal,
            and a little magic in the places where nature comes alive.
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={exploreGarden}>
              Discover the garden <span>↗</span>
            </button>
            <a className="text-button" href="#about">
              <span className="play-icon">▶</span>
              Our philosophy
            </a>
          </div>

          <div className="hero-note">
            <span className="note-icon">✿</span>
            <span>PAUSE. BREATHE. BLOOM.</span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>35°41'22.2"N &nbsp; 139°41'30.1"E</span>
          <span className="scroll-indicator">SCROLL TO WANDER <span>↓</span></span>
          <span>SPRING COLLECTION — 2026</span>
        </div>

        <div className="floating-orb orb-one" />
        <div className="floating-orb orb-two" />
      </section>

      <section className="intro-section" id="about">
        <div className="section-kicker">A WORLD OF QUIET BEAUTY</div>
        <div className="intro-grid">
          <h2>Not just a place.<br /><em>A feeling.</em></h2>
          <div className="intro-copy">
            <p>
              Somewhere between the first morning light and the last falling
              petal, there is a place that reminds you to slow down.
              BLOOMSCAPE is your invitation to find it.
            </p>
            <a href="#discover" className="underlined-link">Find your escape <span>↗</span></a>
          </div>
        </div>

        <div className="stats-grid">
          {gardenStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span>{stat.value}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="discover-section" id="discover">
        <div className="section-heading">
          <div>
            <div className="section-kicker">THE NATURE COLLECTION</div>
            <h2>Find your <em>wild.</em></h2>
          </div>
          <p>Little escapes for the moments<br />that deserve to last forever.</p>
        </div>

        <div className="collection-grid">
          {gardenHighlights.map((item, index) => (
            <article className="collection-card" key={item.number}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="collection-overlay" />
              <div className="card-topline">
                <span>{item.tag}</span>
                <span>{item.number}</span>
              </div>
              <div className="collection-content">
                <span>{item.subtitle}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#experiences" aria-label={`Explore ${item.title}`}>↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section" id="experiences">
        <div className="experience-image" />
        <div className="experience-content">
          <div className="section-kicker">MAKE ROOM FOR WONDER</div>
          <h2>Every season has<br />a story to <em>tell.</em></h2>
          <p>
            From blossom-filled pathways to quiet green retreats,
            discover experiences that bring you closer to the natural world.
          </p>
          <a href="#home" className="primary-button">Back to the beginning <span>↑</span></a>
        </div>
        <div className="experience-decoration">✿</div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <BlossomMark />
          <span>BLOOM<span className="brand-light">SCAPE</span></span>
        </a>
        <p>Made for the love of nature.</p>
        <span>© 2026 BLOOMSCAPE · ALL RIGHTS RESERVED</span>
      </footer>
    </main>
  );
}

export default App;

