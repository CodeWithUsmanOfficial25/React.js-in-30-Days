import React, { useMemo, useState } from "react";
import { aircraft, flightStats, aviationGallery, aviationFacts } from "../data/day23Data";
import AircraftCard from "../components/day23/AircraftCard";
import AircraftModal from "../components/day23/AircraftModal";
import GalleryCard from "../components/day23/GalleryCard";
import FlightFact from "../components/day23/FlightFact";
import "./Day23.css";

const categories = ["All Aircraft", "Commercial", "Military", "Private"];

export default function Day23() {
  const [category, setCategory] = useState("All Aircraft");
  const [search, setSearch] = useState("");
  const [selectedPlane, setSelectedPlane] = useState(null);

  const filteredAircraft = useMemo(() => aircraft.filter((plane) => {
    const matchesCategory = category === "All Aircraft" || plane.type === category;
    const matchesSearch = `${plane.name} ${plane.origin} ${plane.type}`
      .toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, search]);

  return (
    <main className="aerolith">
      <nav className="aero-nav">
        <a href="#aero-home" className="aero-brand">
          <span className="aero-brand-mark">A</span>
          <span>AEROLITH<small>THE WORLD OF FLIGHT</small></span>
        </a>
        <div className="aero-nav-links">
          <a href="#fleet">Aircraft</a>
          <a href="#technology">Technology</a>
          <a href="#gallery">Gallery</a>
          <a href="#intelligence">Discover</a>
        </div>
        <a href="#fleet" className="aero-nav-button">Explore fleet <span>↗</span></a>
      </nav>

      <section className="aero-hero" id="aero-home">
        <div className="aero-hero-copy">
          <div className="aero-overline"><span /> BEYOND THE LIMITS OF FLIGHT</div>
          <h1>The sky is<br />not the <em>limit.</em></h1>
          <p>Discover the machines that challenge gravity. Explore legendary aircraft, breakthrough engineering and the extraordinary world of aviation.</p>
          <div className="aero-hero-actions">
            <a className="aero-primary-button" href="#fleet">Explore aircraft <span>↗</span></a>
            <a className="aero-secondary-link" href="#technology">Discover technology →</a>
          </div>
          <div className="aero-stats">
            {flightStats.map((stat) => (
              <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </div>
        </div>

        <div className="aero-hero-visual">
          <div className="aero-planet planet-one" />
          <div className="aero-planet planet-two" />
          <div className="aero-hero-photo">
            <img src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1500&q=90" alt="Aircraft flying through the sky" />
          </div>
          <div className="aero-float-label float-label-one"><span>✦</span> ENGINEERED TO FLY</div>
          <div className="aero-float-label float-label-two">ALTITUDE / 35,000 FT</div>
          <div className="aero-orbit-ring" />
          <div className="aero-hero-cross cross-one">✳</div>
          <div className="aero-hero-cross cross-two">✦</div>
          <div className="aero-flight-stamp">FLIGHT<br />WITHOUT<br />LIMITS</div>
        </div>
        <div className="aero-scroll-note"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section className="aero-fleet-section" id="fleet">
        <div className="aero-section-heading">
          <div>
            <span className="aero-eyebrow">01 / THE AIRCRAFT COLLECTION</span>
            <h2>Built to <em>defy gravity.</em></h2>
          </div>
          <p>From commercial giants to extraordinary military machines, discover the engineering behind iconic aircraft.</p>
        </div>

        <div className="aero-fleet-tools">
          <div className="aero-filters">
            {categories.map((item) => (
              <button key={item} className={category === item ? "aero-filter active" : "aero-filter"} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          <label className="aero-search">
            <span>⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search aircraft..." />
          </label>
        </div>

        <div className="aircraft-grid">
          {filteredAircraft.map((plane, index) => (
            <AircraftCard key={plane.id} plane={plane} index={index} onSelect={setSelectedPlane} />
          ))}
        </div>
        {filteredAircraft.length === 0 && <p className="aero-empty">No aircraft found. Try another search.</p>}
      </section>

      <section className="aero-technology-section" id="technology">
        <div className="aero-tech-visual">
          <div className="aero-tech-image">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85" alt="Planet Earth from space" />
          </div>
          <div className="aero-tech-orbit" />
          <div className="aero-tech-badge">THE FUTURE<br />IS IN FLIGHT</div>
          <span className="aero-tech-spark">✳</span>
        </div>
        <div className="aero-tech-copy">
          <span className="aero-eyebrow">02 / THE SCIENCE OF FLIGHT</span>
          <h2>Where science<br />meets <em>the sky.</em></h2>
          <p>Modern aviation combines aerodynamics, advanced materials, propulsion systems and precision engineering to make flight possible.</p>
          <div className="aero-tech-points">
            <div><span>01</span><strong>Aerodynamics</strong><small>Shaping airflow to create lift and reduce drag.</small></div>
            <div><span>02</span><strong>Propulsion</strong><small>Turning engine power into forward movement.</small></div>
            <div><span>03</span><strong>Avionics</strong><small>Smart systems guiding aircraft through the skies.</small></div>
          </div>
        </div>
      </section>

      <section className="aero-gallery-section" id="gallery">
        <div className="aero-section-heading">
          <div>
            <span className="aero-eyebrow">03 / THE VIEW FROM ABOVE</span>
            <h2>Perspective <em>changes everything.</em></h2>
          </div>
          <p>Explore the beauty of aviation through remarkable views and unforgettable moments in the air.</p>
        </div>
        <div className="aero-gallery-grid">
          {aviationGallery.map((item, index) => (
            <GalleryCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="aero-discover-section" id="intelligence">
        <div className="aero-discover-copy">
          <span className="aero-eyebrow">04 / KNOW YOUR SKIES</span>
          <h2>Every flight<br />has a <em>story.</em></h2>
          <p>Discover the science, history and extraordinary achievements that continue to shape aviation.</p>
          <a href="#fleet" className="aero-primary-button">Explore the collection <span>↗</span></a>
        </div>
        <FlightFact facts={aviationFacts} />
      </section>

      <footer className="aero-footer">
        <a href="#aero-home" className="aero-brand">
          <span className="aero-brand-mark">A</span>
          <span>AEROLITH<small>THE WORLD OF FLIGHT</small></span>
        </a>
        <p>Designed for those who look beyond the horizon.</p>
        <a href="#aero-home">BACK TO TOP ↑</a>
      </footer>

      <AircraftModal plane={selectedPlane} onClose={() => setSelectedPlane(null)} />
    </main>
  );
}
