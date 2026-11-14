import React, { useMemo, useState } from "react";
import { animals, habitats, gallery } from "../data/day22Data";
import AnimalCard from "../components/day22/AnimalCard";
import HabitatCard from "../components/day22/HabitatCard";
import AnimalModal from "../components/day22/AnimalModal";
import "./Day22.css";

const filters = ["All Species", "Savanna", "Woodlands", "Bamboo Forest", "Tropical Forest"];

export default function Day22() {
  const [activeFilter, setActiveFilter] = useState("All Species");
  const [search, setSearch] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const filteredAnimals = useMemo(() => animals.filter((animal) => {
    const matchesFilter = activeFilter === "All Species" || animal.habitat === activeFilter;
    const matchesSearch = `${animal.name} ${animal.habitat} ${animal.scientific}`
      .toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }), [activeFilter, search]);

  return (
    <main className="wildora">
      <div className="wildora-noise" />
      <nav className="wild-nav">
        <a className="wild-brand" href="#home">
          <span className="brand-symbol">W</span>
          <span>WILDORA<small>THE WILD IS CALLING</small></span>
        </a>
        <div className="wild-nav-links">
          <a href="#discover">Discover</a>
          <a href="#habitats">Habitats</a>
          <a href="#gallery">Gallery</a>
          <a href="#mission">Our Mission</a>
        </div>
        <a className="nav-explore" href="#discover">Explore nature <span>↗</span></a>
      </nav>

      <section className="wild-hero" id="home">
        <div className="hero-copy">
          <div className="hero-kicker"><span /> AN EXPEDITION INTO THE EXTRAORDINARY</div>
          <h1>Discover the<br /><em>untamed</em> world.</h1>
          <p className="hero-description">
            Step beyond the ordinary. Explore incredible creatures,
            extraordinary habitats and the beauty worth protecting.
          </p>
          <div className="hero-actions">
            <a href="#discover" className="wild-primary-btn">Explore wildlife <span>↗</span></a>
            <a href="#mission" className="wild-text-link">Our purpose <span>→</span></a>
          </div>
          <div className="hero-stats">
            <div><strong>8.7M+</strong><span>Species on Earth</span></div>
            <div><strong>36%</strong><span>Wildlife declining</span></div>
            <div><strong>01</strong><span>Planet to protect</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-image-frame">
            <img src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1400&q=90" alt="Lion in its natural habitat" />
          </div>
          <div className="hero-floating-tag tag-top"><span>✳</span> WILDLIFE / 001</div>
          <div className="hero-floating-tag tag-bottom"><span>🌍</span> EARTH'S NATURAL WONDERS</div>
          <div className="hero-stamp">WILD<br />AND<br />FREE</div>
          <span className="hero-spark spark-one">✳</span>
          <span className="hero-spark spark-two">✦</span>
        </div>
        <div className="hero-scroll"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section className="discover-section wild-section" id="discover">
        <div className="section-heading">
          <div>
            <span className="section-kicker">01 / MEET THE WILDLIFE</span>
            <h2>Nature has no<br /><em>duplicates.</em></h2>
          </div>
          <p>Every creature has a story. Meet some of Earth's most fascinating residents and discover what makes each one extraordinary.</p>
        </div>

        <div className="discovery-tools">
          <div className="filter-list">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "filter-chip active" : "filter-chip"}
                onClick={() => setActiveFilter(filter)}
              >{filter}</button>
            ))}
          </div>
          <label className="wild-search">
            <span>⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a species..." />
          </label>
        </div>

        <div className="animal-grid">
          {filteredAnimals.map((animal, index) => (
            <AnimalCard key={animal.id} animal={animal} index={index} onSelect={setSelectedAnimal} />
          ))}
        </div>
        {filteredAnimals.length === 0 && (
          <div className="wild-empty">No species found. Try another search or habitat.</div>
        )}
      </section>

      <section className="habitat-section wild-section" id="habitats">
        <div className="section-heading habitat-heading">
          <div>
            <span className="section-kicker">02 / EXPLORE THEIR WORLD</span>
            <h2>Where the wild<br /><em>belongs.</em></h2>
          </div>
          <p>From endless golden plains to ancient green forests, each habitat is a living world with its own rhythm.</p>
        </div>
        <div className="habitat-grid">
          {habitats.map((habitat, index) => (
            <HabitatCard key={habitat.name} habitat={habitat} index={index} />
          ))}
        </div>
      </section>

      <section className="wild-gallery-section wild-section" id="gallery">
        <div className="gallery-heading">
          <div>
            <span className="section-kicker">03 / MOMENTS IN THE WILD</span>
            <h2>Nature, <em>unfiltered.</em></h2>
          </div>
          <span className="gallery-count">FIELD NOTES / 2026</span>
        </div>
        <div className="wild-gallery">
          {gallery.map((item, index) => (
            <figure className={`gallery-tile gallery-tile-${index + 1}`} key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <figcaption><span>0{index + 1}</span>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mission-section" id="mission">
        <div className="mission-art">
          <div className="mission-circle circle-back" />
          <div className="mission-photo">
            <img src="https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=1200&q=85" alt="Wild giraffe in nature" />
          </div>
          <span className="mission-leaf leaf-one">✳</span>
          <span className="mission-leaf leaf-two">✦</span>
          <div className="mission-note">PROTECT<br />WHAT MAKES<br />US ALIVE.</div>
        </div>
        <div className="mission-copy">
          <span className="section-kicker">04 / THE WILD NEEDS US</span>
          <h2>Protect the<br /><em>extraordinary.</em></h2>
          <p>Wildlife conservation is about more than saving individual species. It means protecting ecosystems, preserving biodiversity and giving future generations a living planet.</p>
          <a href="#discover" className="wild-primary-btn">Keep exploring <span>↗</span></a>
        </div>
      </section>

      <footer className="wild-footer">
        <a className="wild-brand footer-brand" href="#home">
          <span className="brand-symbol">W</span>
          <span>WILDORA<small>THE WILD IS CALLING</small></span>
        </a>
        <p>Made for the love of our wild planet.</p>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
      </footer>

      <AnimalModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />
    </main>
  );
}
