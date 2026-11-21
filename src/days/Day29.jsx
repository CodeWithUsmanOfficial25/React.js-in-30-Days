import React, { useMemo, useState } from "react";
import { assets, categories, creatorStats, revenueBars } from "../data/day29Data";
import AssetCard from "../components/day29/AssetCard";
import "./Day29.css";

export default function Day29() {
  const [category, setCategory] = useState("All Assets");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured");
  const [saved, setSaved] = useState([]);
  const [cart, setCart] = useState([]);
  const [notice, setNotice] = useState("");
  const [activeTab, setActiveTab] = useState("Discover");
  const [showCart, setShowCart] = useState(false);
  const [creatorMode, setCreatorMode] = useState(false);

  const filteredAssets = useMemo(() => {
    let list = assets.filter((asset) => category === "All Assets" || asset.category === category);
    list = list.filter((asset) => `${asset.name} ${asset.creator} ${asset.category}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "Best Selling") list = [...list].sort((a, b) => b.sales - a.sales);
    return list;
  }, [category, search, sort]);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const commission = cartTotal * 0.1;

  const addToCart = (asset) => {
    setCart((current) => [...current, asset]);
    setNotice(`${asset.name} added to your collection`);
    setTimeout(() => setNotice(""), 2400);
  };

  const toggleSave = (id) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="revenue-app">
      <div className="revenue-bg-shape bg-shape-one" />
      <div className="revenue-bg-shape bg-shape-two" />
      <div className="revenue-bg-shape bg-shape-three" />
      <div className="revenue-grain" />

      <header className="revenue-header">
        <a href="#home" className="revenue-logo">
          <span className="revenue-logo-mark">R<span>↗</span></span>
          <span>revenue<span className="logo-loop">loop.</span><small>THE CREATOR ECONOMY</small></span>
        </a>
        <nav className="revenue-nav">
          {["Discover", "Creators", "How It Works"].map((tab) => (
            <button key={tab} className={activeTab === tab ? "nav-active" : ""} onClick={() => { setActiveTab(tab); goTo(tab === "Creators" ? "earnings" : tab === "How It Works" ? "business-model" : "home"); }}>{tab}</button>
          ))}
        </nav>
        <div className="revenue-header-actions">
          <button className="sell-button" onClick={() => { setCreatorMode(!creatorMode); goTo("earnings"); }}>{creatorMode ? "CREATOR VIEW" : "START SELLING"} <span>↗</span></button>
          <button className="cart-button" onClick={() => setShowCart(!showCart)}>Bag <span>{cart.length}</span></button>
        </div>
      </header>

      {showCart && (
        <aside className="cart-panel">
          <div className="cart-panel-head"><strong>YOUR COLLECTION</strong><button onClick={() => setShowCart(false)}>✕</button></div>
          {cart.length === 0 ? <p>Your collection is waiting for its first asset.</p> : cart.map((item, index) => <div className="cart-line" key={`${item.id}-${index}`}><span>{item.name}</span><strong>${item.price}</strong></div>)}
          <div className="cart-total"><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div>
          <div className="cart-fee">Platform service fee included in checkout: ${commission.toFixed(2)}</div>
          <button className="checkout-button" onClick={() => { setNotice("Demo checkout — payment integration will be added with the backend."); setShowCart(false); }}>CONTINUE TO CHECKOUT ↗</button>
        </aside>
      )}

      <section className="revenue-hero" id="home">
        <div className="hero-copy">
          <div className="revenue-eyebrow"><span /> THE DIGITAL CREATOR ECONOMY <b>EST. 2026</b></div>
          <h1>MAKE IT.<br /><em>SELL IT.</em><br />EARN <span>MORE.</span></h1>
          <p>A new home for digital creators. Discover exceptional digital assets, support independent talent, and turn creativity into a revenue stream.</p>
          <div className="revenue-hero-actions">
            <button className="hero-main-button" onClick={() => goTo("marketplace")}>EXPLORE THE MARKET <span>↗</span></button>
            <button className="hero-text-button" onClick={() => goTo("earnings")}>I'M A CREATOR <span>→</span></button>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars"><i>J</i><i>M</i><i>A</i><i>+</i></div>
            <div><strong>12,400+ creators</strong><small>building their next income stream</small></div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-art-orbit orbit-large" />
          <div className="hero-art-orbit orbit-small" />
          <div className="floating-label label-top">CREATIVITY → INCOME</div>
          <div className="floating-label label-bottom">YOUR NEXT BESTSELLER</div>
          <div className="hero-art-disc">
            <div className="hero-art-inner">
              <span>MAKE</span><strong>GOOD<br />THINGS.</strong><i>✳</i>
            </div>
          </div>
          <div className="floating-mini-card mini-card-one"><span>↗</span><strong>$2,480</strong><small>MONTHLY SALES</small></div>
          <div className="floating-mini-card mini-card-two"><span>✦</span><strong>+24.8%</strong><small>CREATOR GROWTH</small></div>
          <div className="hero-star star-a">✳</div><div className="hero-star star-b">✦</div><div className="hero-star star-c">✧</div>
        </div>
      </section>

      <section className="revenue-trust-strip">
        <span>BUILT FOR INDEPENDENT CREATORS</span><i />
        <strong>DESIGNERS</strong><b>✳</b><strong>MAKERS</strong><b>✳</b><strong>ARTISTS</strong><b>✳</b><strong>BUILDERS</strong>
      </section>

      <section className="marketplace-section" id="marketplace">
        <div className="marketplace-heading">
          <div><span className="section-eyebrow">01 / THE MARKETPLACE</span><h2>FIND YOUR NEXT <em>FAVORITE.</em></h2><p>Handpicked digital goods made by people who love what they do.</p></div>
          <div className="marketplace-counter"><strong>06</strong><span>CURATED<br />DROPS</span></div>
        </div>

        <div className="market-controls">
          <div className="category-tabs">
            {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "category-active" : ""}>{item}</button>)}
          </div>
          <div className="market-search-sort">
            <label className="market-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search digital goods..." /></label>
            <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price: Low to High</option><option>Top Rated</option><option>Best Selling</option></select>
          </div>
        </div>

        <div className="asset-grid">
          {filteredAssets.length ? filteredAssets.map((asset) => <AssetCard key={asset.id} asset={asset} saved={saved.includes(asset.id)} onSave={toggleSave} onAdd={addToCart} />) : <div className="empty-assets">No assets found. Try another search or category.</div>}
        </div>
        <div className="market-bottom"><span>SHOWING {filteredAssets.length} OF {assets.length} DIGITAL ASSETS</span><button onClick={() => { setCategory("All Assets"); setSearch(""); setSort("Featured"); }}>RESET DISCOVERY ↗</button></div>
      </section>

      <section className="creator-section" id="earnings">
        <div className="creator-copy">
          <span className="section-eyebrow">02 / FOR THE CREATORS</span>
          <h2>YOUR TALENT.<br /><em>YOUR BUSINESS.</em></h2>
          <p>Publish your digital work, build an audience, and track every sale from one beautiful creator space.</p>
          <ul><li><span>01</span> Upload and showcase your work</li><li><span>02</span> Set your own product pricing</li><li><span>03</span> Track revenue and sales growth</li><li><span>04</span> Build a sustainable creative business</li></ul>
          <button className="creator-cta" onClick={() => setCreatorMode(!creatorMode)}>{creatorMode ? "CREATOR PREVIEW ACTIVE ✓" : "OPEN CREATOR STUDIO"} <span>↗</span></button>
        </div>
        <div className="earnings-dashboard">
          <div className="dashboard-top"><div><span>CREATOR OVERVIEW</span><strong>Good morning, Alex. ✳</strong></div><span className="dashboard-live"><i /> LIVE PREVIEW</span></div>
          <div className="creator-stat-grid">{creatorStats.map((stat) => <div className="creator-stat" key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong><small>↗ {stat.change}</small></div>)}</div>
          <div className="revenue-chart">
            <div className="chart-heading"><strong>Revenue performance</strong><span>LAST 12 MONTHS ⌄</span></div>
            <div className="chart-bars">{revenueBars.map((height, index) => <div className="chart-bar-wrap" key={index}><i style={{ height: `${height}%`, "--bar-index": index }} /><small>{["J","F","M","A","M","J","J","A","S","O","N","D"][index]}</small></div>)}</div>
          </div>
          <div className="payout-row"><span><i>↗</i> NEXT PAYOUT</span><strong>$1,240.00</strong><small>Scheduled · 28 Nov</small></div>
          {creatorMode && <div className="creator-preview-note">Creator studio preview is active. Backend account creation and real payout features are not connected yet.</div>}
        </div>
      </section>

      <section className="business-model-section" id="business-model">
        <div className="business-heading"><span className="section-eyebrow">03 / THE BUSINESS MODEL</span><h2>GOOD CREATIVITY.<br /><em>GOOD BUSINESS.</em></h2><p>A platform designed to create value for creators, buyers and the platform itself.</p></div>
        <div className="revenue-model-grid">
          <article className="model-card model-blue"><span className="model-number">01</span><div className="model-icon">↗</div><h3>TRANSACTION<br />COMMISSION</h3><strong>10%</strong><p>Earn a platform fee from each successful digital asset sale.</p><span className="model-bottom">REVENUE STREAM / 01</span></article>
          <article className="model-card model-orange"><span className="model-number">02</span><div className="model-icon">✳</div><h3>CREATOR PRO<br />SUBSCRIPTIONS</h3><strong>$12<span>/mo</span></strong><p>Offer premium creator tools, analytics and expanded storefront features.</p><span className="model-bottom">REVENUE STREAM / 02</span></article>
          <article className="model-card model-cream"><span className="model-number">03</span><div className="model-icon">◈</div><h3>FEATURED<br />PLACEMENTS</h3><strong>SPOTLIGHT</strong><p>Sell promoted discovery positions and sponsored marketplace features.</p><span className="model-bottom">REVENUE STREAM / 03</span></article>
        </div>
        <div className="model-footnote">Illustrative business model. Revenue depends on real users, transactions, operating costs and platform execution.</div>
      </section>

      <section className="final-cta">
        <div className="cta-decoration">✳</div>
        <span>THE NEXT CREATOR SUCCESS STORY STARTS HERE</span>
        <h2>MAKE SOMETHING<br /><em>WORTH SELLING.</em></h2>
        <button onClick={() => goTo("marketplace")}>DISCOVER YOUR NEXT ASSET <span>↗</span></button>
      </section>

      <footer className="revenue-footer">
        <a href="#home" className="revenue-logo"><span className="revenue-logo-mark">R<span>↗</span></span><span>revenue<span className="logo-loop">loop.</span><small>THE CREATOR ECONOMY</small></span></a>
        <span>CREATIVITY SHOULD PAY.</span>
        <small>© 2026 REVENUELOOP — CONCEPT EXPERIENCE</small>
      </footer>

      {notice && <div className="revenue-toast"><span>✳</span>{notice}<button onClick={() => setNotice("")}>✕</button></div>}
    </main>
  );
}
