import React, { useEffect, useMemo, useState } from "react";
import { vehicleCategories } from "../data/day18Data";
import CategoryFilter from "../components/day18/CategoryFilter";
import VehicleCard from "../components/day18/VehicleCard";
import SearchBar from "../components/day18/SearchBar";
import VehicleModal from "../components/day18/VehicleModal";
import "./Day18.css";

export default function Day18() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") setSelectedVehicle(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filteredVehicles = useMemo(() => {
    if (!activeCategory) return [];
    const term = search.trim().toLowerCase();
    if (!term) return activeCategory.models;
    return activeCategory.models.filter((vehicle) =>
      [vehicle.name, vehicle.type, vehicle.engine, vehicle.power].some((value) => value.toLowerCase().includes(term))
    );
  }, [activeCategory, search]);

  const goHome = () => {
    setSelectedVehicle(null);
    setActiveCategory(null);
    setSearch("");
  };

  const goToCategory = (category) => {
    setActiveCategory(category);
    setSearch("");
  };

  return (
    <main className="day18-showroom">
      <header className="showroom-header">
        <button className="showroom-brand" onClick={goHome}>
          <span className="brand-symbol">V</span>
          <span>VANTA<span className="brand-accent">MOTORS</span><small>THE VEHICLE COLLECTION</small></span>
        </button>
        <div className="header-status"><span></span> CURATED MOBILITY COLLECTION</div>
        <div className="header-edition">EST. 2026 <b> / </b> VOL. 018</div>
      </header>

      {!activeCategory ? (
        <section className="showroom-home">
          <div className="home-intro">
            <div className="intro-copy">
              <span className="section-kicker"><i></i> THE WORLD OF MOBILITY</span>
              <h1>Find your<br /><em>kind of drive.</em></h1>
              <p>Explore a considered collection of vehicles. Choose a category to discover its models, specifications and available configurations.</p>
              <div className="intro-bottom"><span>07 COLLECTIONS</span><span>42+ MODELS</span><span>01 DESTINATION</span></div>
            </div>
            <div className="intro-art">
              <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=90" alt="Premium vehicle" onError={(event) => { event.currentTarget.src = "https://placehold.co/1200x900/20251f/f2f2e9?text=Vanta+Motors"; }} />
              <div className="art-caption"><span>01 / COLLECTION</span><strong>Move with intention.</strong></div>
              <div className="art-stamp">V<br />M</div>
            </div>
          </div>
          <div className="category-section">
            <div className="section-heading">
              <div><span className="section-kicker"><i></i> SELECT YOUR CATEGORY</span><h2>Explore the collection<span>.</span></h2></div>
              <span className="section-index">01 — 07</span>
            </div>
            <CategoryFilter categories={vehicleCategories} onSelect={goToCategory} />
          </div>
          <footer className="showroom-footer"><span>VANTA MOTORS © 2026</span><span>DESIGNED FOR EVERY JOURNEY</span><span>DAY 18 / 30</span></footer>
        </section>
      ) : (
        <section className="category-dashboard">
          <button className="back-to-home" onClick={goHome}>← ALL VEHICLE CATEGORIES</button>
          <div className="category-hero">
            <div>
              <span className="section-kicker"><i></i> VEHICLE COLLECTION / {activeCategory.id.toUpperCase()}</span>
              <h1>{activeCategory.name}<em>.</em></h1>
              <p>{activeCategory.subtitle}. Explore the available models and choose one to see its configurations.</p>
              <span className="category-model-count">0{activeCategory.models.length} MODELS IN THIS COLLECTION</span>
            </div>
            <img src={activeCategory.image} alt={activeCategory.name} onError={(event) => { event.currentTarget.src = "https://placehold.co/900x600/20251f/f2f2e9?text=Collection"; }} />
          </div>
          <div className="models-toolbar">
            <div><span className="section-kicker"><i></i> THE LINEUP</span><h2>Choose your model<span>.</span></h2></div>
            <SearchBar value={search} onChange={setSearch} placeholder={`Search ${activeCategory.name.toLowerCase()}...`} />
          </div>
          <div className="vehicle-model-grid">
            {filteredVehicles.map((vehicle, index) => <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} onSelect={setSelectedVehicle} />)}
          </div>
          {filteredVehicles.length === 0 && <div className="no-vehicles"><span>⌕</span><h3>No matching models</h3><p>Try another search term.</p></div>}
          <footer className="showroom-footer"><button onClick={goHome}>← BACK TO COLLECTIONS</button><span>VANTA MOTORS © 2026</span><span>DAY 18 / 30</span></footer>
        </section>
      )}

      {selectedVehicle && <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
    </main>
  );
}

