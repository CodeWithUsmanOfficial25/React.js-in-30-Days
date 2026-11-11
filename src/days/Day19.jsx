import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { destinations, destinationImage, homeImage, photoNames } from "../data/day19Data";
import "./Day19.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="atlas-nav">
      <Link to="/" className="atlas-brand"><span className="brand-mark">A</span> ATLAS<span className="brand-dot">.</span></Link>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
      <nav className={open ? "nav-links nav-open" : "nav-links"}>
        <NavLink to="/" end>Discover</NavLink>
        <a href="/#destinations">Destinations</a>
        <NavLink to="/about">Our story</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <Link to="/#destinations" className="nav-cta">Explore places <span>↗</span></Link>
    </header>
  );
}

function Footer() {
  return <footer className="atlas-footer"><Link to="/" className="atlas-brand">ATLAS<span className="brand-dot">.</span></Link><span>Collect moments, not things.</span><span>© 2026 ATLAS Travel Studio</span></footer>;
}

function DestinationCard({ place, index }) {
  return (
    <Link to={`/destinations/${place.slug}`} className="destination-card">
      <div className="card-image-wrap">
        <img src={destinationImage(place.slug, "cover")} alt={`${place.name}, ${place.country}`} loading="lazy" />
        <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="card-arrow">↗</span>
      </div>
      <div className="card-info">
        <div><span className="card-country">{place.country}</span><h3>{place.name}</h3></div>
        <span className="card-rating">★ {place.rating}</span>
      </div>
      <p>{place.tagline}</p>
      <div className="card-bottom"><span>{place.category}</span><span>Discover place ↗</span></div>
    </Link>
  );
}

function HomePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const regions = ["All", "Europe", "Asia", "Middle East", "North America"];
  const filtered = useMemo(() => destinations.filter((place) =>
    (region === "All" || place.region.includes(region)) &&
    `${place.name} ${place.country} ${place.category}`.toLowerCase().includes(search.toLowerCase())
  ), [search, region]);

  return (
    <>
      <section className="hero-section">
        <img className="hero-bg" src={homeImage("hero-01")} alt="Beautiful mountain lake" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow light-eyebrow"><i /> YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>The world is<br/>waiting <em>for you.</em></h1>
          <p>Extraordinary places. Unforgettable stories. Find the journey that feels like yours.</p>
          <a href="#destinations" className="hero-button">Explore destinations <span>↗</span></a>
          <div className="hero-meta"><span>12 CURATED DESTINATIONS</span><span>✳ TRAVEL WITH INTENTION</span></div>
        </div>
        <div className="hero-side-note">DISCOVER BEYOND THE ORDINARY — 2026</div>
        <div className="hero-image-label"><span>01 / 04</span><span>THE ART OF GETTING LOST</span></div>
      </section>

      <section className="intro-section">
        <div className="section-kicker">A WORLD OF POSSIBILITIES <span>✳</span></div>
        <div className="intro-grid">
          <h2>Not just places.<br/><em>New perspectives.</em></h2>
          <p>From quiet island mornings to electric city nights, we bring the world's most inspiring destinations together in one place. Your next unforgettable story starts with a single click.</p>
        </div>
        <div className="stats-row">
          <div><strong>12</strong><span>Curated destinations</span></div>
          <div><strong>60+</strong><span>Travel photographs</span></div>
          <div><strong>04</strong><span>Continents to explore</span></div>
          <div><strong>∞</strong><span>Memories to make</span></div>
        </div>
      </section>

      <section className="destinations-section" id="destinations">
        <div className="section-heading">
          <div><span className="section-kicker">FIND YOUR SOMEWHERE</span><h2>Explore the <em>world.</em></h2></div>
          <p>Handpicked places for the curious, the dreamers and the forever explorers.</p>
        </div>
        <div className="filter-toolbar">
          <div className="region-filters">{regions.map(item => <button key={item} onClick={() => setRegion(item)} className={region === item ? "filter-active" : ""}>{item}</button>)}</div>
          <label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find your destination..." /></label>
        </div>
        <div className="destination-grid">
          {filtered.map((place, index) => <DestinationCard key={place.slug} place={place} index={index} />)}
        </div>
        {filtered.length === 0 && <div className="empty-state">No destinations found. Try another search.</div>}
      </section>

      <section className="visual-break">
        <img src={homeImage("experience-01")} alt="Ocean travel scenery" loading="lazy"/>
        <div><span className="eyebrow light-eyebrow">THE JOURNEY IS THE DESTINATION</span><h2>Go where you<br/><em>feel alive.</em></h2><p>Take the scenic route. Stay a little longer. Make every moment count.</p><a href="#destinations" className="light-link">Find your next escape ↗</a></div>
      </section>

      <section className="experience-section">
        <div className="section-heading"><div><span className="section-kicker">TRAVEL YOUR WAY</span><h2>Make it <em>memorable.</em></h2></div><p>Every journey has its own rhythm. Choose the experience that speaks to you.</p></div>
        <div className="experience-grid">
          {[
            ["experience-02","01","Slow escapes","Quiet coastlines, peaceful stays and time to breathe."],
            ["experience-03","02","Wild adventures","Mountain trails, new horizons and unforgettable views."],
            ["experience-04","03","Culture & cuisine","Local flavors, historic streets and stories worth sharing."]
          ].map(([image, number, title, description]) => <article className="experience-card" key={number}><img src={homeImage(image)} alt={title} loading="lazy"/><div><span>{number} / EXPERIENCE</span><h3>{title}</h3><p>{description}</p></div></article>)}
        </div>
      </section>
    </>
  );
}

function DetailPage() {
  const { slug } = useParams();
  const place = destinations.find(item => item.slug === slug);
  if (!place) return <main className="not-found"><span>404</span><h1>Somewhere not found.</h1><Link to="/">Back to discovery ↗</Link></main>;

  return (
    <main className="detail-page">
      <div className="detail-top"><Link to="/">← Back to all destinations</Link><span>ATLAS JOURNAL / DESTINATION GUIDE</span></div>
      <section className="detail-hero">
        <img src={destinationImage(place.slug, "cover")} alt={place.name}/>
        <div className="detail-hero-overlay"/>
        <div className="detail-hero-content"><span className="eyebrow light-eyebrow">{place.country.toUpperCase()} · {place.region.toUpperCase()}</span><h1>{place.name}<em>.</em></h1><p>{place.tagline}</p><span className="detail-rating">★ {place.rating} / 5.0 · CURATED DESTINATION</span></div>
      </section>
      <section className="detail-intro"><div><span className="section-kicker">THE DESTINATION</span><h2>A place to<br/><em>remember.</em></h2></div><div><p>{place.description}</p><div className="detail-facts"><div><span>IDEAL STAY</span><strong>{place.days}</strong></div><div><span>EST. STARTING BUDGET</span><strong>{place.budget}</strong></div><div><span>BEST SEASON</span><strong>{place.season}</strong></div></div></div></section>
      <section className="gallery-section"><div className="section-heading"><div><span className="section-kicker">A CLOSER LOOK</span><h2>See it. <em>Feel it.</em></h2></div><p>Five moments that capture the spirit of {place.name}.</p></div><div className="photo-gallery">{photoNames.map((photo, index) => <figure className={`gallery-item gallery-item-${index + 1}`} key={photo}><img src={destinationImage(place.slug, photo)} alt={`${place.name} ${photo}`} loading="lazy"/><figcaption><span>0{index + 1}</span>{["The first impression","Iconic landmarks","Local culture","Flavors to remember","The experience"][index]}</figcaption></figure>)}</div></section>
      <section className="highlights-section"><span className="section-kicker">DON'T MISS</span><h2>Little moments. <em>Big memories.</em></h2><div className="highlight-list">{place.highlights.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><span>↗</span></div>)}</div></section>
      <section className="detail-cta"><span className="eyebrow">YOUR STORY STARTS HERE</span><h2>Ready to discover<br/><em>{place.name}?</em></h2><Link to="/contact">Plan your journey ↗</Link></section>
    </main>
  );
}

function InfoPage({ contact = false }) {
  const [sent, setSent] = useState(false);
  return <main className="info-page"><span className="section-kicker">{contact ? "LET'S TALK" : "THE ATLAS PHILOSOPHY"}</span><h1>{contact ? <>Your next journey<br/><em>starts with hello.</em></> : <>The world is vast.<br/><em>Stay curious.</em></>}</h1><p>{contact ? "Have a destination in mind? Tell us what kind of journey you dream about." : "ATLAS is a curated travel discovery experience built for people who believe that the best stories begin beyond familiar borders."}</p>{contact ? <form className="contact-form" onSubmit={e => {e.preventDefault();setSent(true);}}><input required placeholder="Your name"/><input required type="email" placeholder="Email address"/><textarea required placeholder="Tell us about your dream trip"/><button type="submit">Send your message ↗</button>{sent && <span className="form-success">Thanks! Your demo message has been received.</span>}</form> : <Link className="hero-button dark-button" to="/">Explore destinations ↗</Link>}</main>;
}

export default function Day19() {
  const { slug } = useParams();
  const isInfo = window.location.pathname === "/about" || window.location.pathname === "/contact";
  const isContact = window.location.pathname === "/contact";
  return <div className="atlas-app"><Navbar/>{slug ? <DetailPage/> : isInfo ? <InfoPage contact={isContact}/> : <HomePage/>}<Footer/></div>;
}
