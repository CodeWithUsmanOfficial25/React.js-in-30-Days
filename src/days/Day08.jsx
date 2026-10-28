import { useMemo, useState } from "react";
import DestinationCard from "../components/day08/DestinationCard";
import { destinations, travelCategories } from "../data/day08Data";
import { travelStats } from "../data/day08Stats";
import "./Day08.css";

function Day08() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All places");
  const [sortBy, setSortBy] = useState("featured");
  const [savedIds, setSavedIds] = useState([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const visibleDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = destinations.filter((place) => {
      const matchesSearch = [
        place.name,
        place.country,
        place.category,
        place.region
      ].some((value) => value.toLowerCase().includes(query));

      const matchesCategory =
        category === "All places" || place.category === category;

      const matchesSaved = !savedOnly || savedIds.includes(place.id);

      return matchesSearch && matchesCategory && matchesSaved;
    });

    if (sortBy === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...filtered].sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [search, category, sortBy, savedIds, savedOnly]);

  function toggleSave(id) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  function resetFilters() {
    setSearch("");
    setCategory("All places");
    setSortBy("featured");
    setSavedOnly(false);
  }

  return (
    <main className="roamly-page">
      <header className="roamly-header">
        <a className="roamly-logo" href="#home" aria-label="Roamly home">
          <span className="logo-symbol">r.</span>
          <span>roamly<span className="logo-period">.</span></span>
        </a>

        <nav className="roamly-nav" aria-label="Main navigation">
          <a className="nav-active" href="#destinations">Discover</a>
          <a href="#travel-notes">Travel notes</a>
          <button
            className={`saved-nav-button ${savedOnly ? "saved-nav-active" : ""}`}
            onClick={() => {
              setSavedOnly((current) => !current);
              document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            ♡ Saved <span className="saved-count">{savedIds.length}</span>
          </button>
        </nav>

        <a className="header-cta" href="#destinations">Find your somewhere ↗</a>
      </header>

      <section className="travel-hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1>The world is<br />closer than <em>you think.</em></h1>
          <p className="hero-description">
            Thoughtfully picked places for the curious, the spontaneous,
            and everyone who feels most alive somewhere new.
          </p>
          <a className="hero-button" href="#destinations">
            Find your next escape <span>↗</span>
          </a>
          <div className="hero-note">
            <span className="avatar-stack"><i>U</i><i>R</i><i>A</i></span>
            <span><strong>Made for the curious</strong><br />Less scrolling, more exploring.</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1300&q=90"
            alt="Colourful Italian coastal villages beside the sea"
          />
          <div className="hero-image-shade" />
          <div className="hero-image-caption">
            <span>THE ART OF GETTING LOST</span>
            <strong>Somewhere on the Italian Riviera</strong>
          </div>
          <div className="floating-note">
            <span className="floating-note-icon">✳</span>
            <div><strong>Go where you feel alive.</strong><small>Your next favourite place awaits.</small></div>
          </div>
          <div className="hero-image-index">01 <span>/</span> 06</div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Travel community highlights">
        {travelStats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
        <div className="stat-manifesto">GOOD TRIPS MAKE<br />GREAT STORIES <span>↗</span></div>
      </section>

      <section className="destinations-section" id="destinations">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> THE WORLD, HANDPICKED</div>
            <h2>Places worth <em>the journey.</em></h2>
            <p>A few good places to begin your next great story.</p>
          </div>
          <div className="destination-counter">
            <strong>{visibleDestinations.length.toString().padStart(2, "0")}</strong>
            <span>PLACES TO EXPLORE</span>
          </div>
        </div>

        <div className="discovery-toolbar">
          <label className="travel-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Try Italy, nature, adventure..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search destinations"
            />
            {search && <button onClick={() => setSearch("")} aria-label="Clear search">×</button>}
          </label>

          <div className="category-filters" aria-label="Filter by category">
            {travelCategories.map((item) => (
              <button
                key={item}
                className={`category-chip ${category === item ? "category-chip-active" : ""}`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="sort-control">
            <span>Sort:</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        {savedOnly && (
          <div className="saved-banner">
            <span>♡</span> Showing your saved places
            <button onClick={() => setSavedOnly(false)}>Show all places ×</button>
          </div>
        )}

        {visibleDestinations.length > 0 ? (
          <div className="destination-grid">
            {visibleDestinations.map((place) => (
              <DestinationCard
                key={place.id}
                destination={place}
                saved={savedIds.includes(place.id)}
                onToggleSave={toggleSave}
                onExplore={setSelectedPlace}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>✳</span>
            <h3>No destinations found just yet.</h3>
            <p>Try another search or reset your filters to explore all our places.</p>
            <button onClick={resetFilters}>Show all destinations ↗</button>
          </div>
        )}
      </section>

      <section className="travel-notes" id="travel-notes">
        <div className="notes-mark">“</div>
        <div>
          <div className="eyebrow">A LITTLE REMINDER</div>
          <h2>You don't need to see<br />the whole world. <em>Just start.</em></h2>
        </div>
        <a href="#destinations">Your story begins here ↗</a>
      </section>

      <footer className="roamly-footer">
        <a className="roamly-logo" href="#home"><span className="logo-symbol">r.</span><span>roamly<span className="logo-period">.</span></span></a>
        <span>Made for the places that stay with you.</span>
        <a href="#home">Back to top ↑</a>
      </footer>

      {selectedPlace && (
        <div className="place-modal-backdrop" onClick={() => setSelectedPlace(null)}>
          <section
            className="place-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-place-name"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedPlace(null)} aria-label="Close details">×</button>
            <img src={selectedPlace.image} alt={selectedPlace.name} />
            <div className="modal-content">
              <div className="eyebrow">{selectedPlace.country} · {selectedPlace.category}</div>
              <h2 id="modal-place-name">{selectedPlace.name}</h2>
              <p>{selectedPlace.description}</p>
              <div className="modal-facts">
                <span>★ {selectedPlace.rating} traveller rating</span>
                <span>{selectedPlace.days} suggested days</span>
                <span>Best: {selectedPlace.season}</span>
              </div>
              <div className="modal-bottom">
                <div><strong>${selectedPlace.price}</strong><span> / day estimated</span></div>
                <button onClick={() => toggleSave(selectedPlace.id)}>
                  {savedIds.includes(selectedPlace.id) ? "♥ Saved" : "♡ Save this place"}
                </button>
              </div>
              <small className="estimate-note">Illustrative budget estimate, not a live travel quote.</small>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Day08;
