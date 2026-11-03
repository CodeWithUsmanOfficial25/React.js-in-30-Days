import { useState } from "react"
import { carColors, wheelStyles, packages, basePrice } from "../data/day14Data"
import "./Day14.css"

function CarVisual({ color, wheel, angle }) {
  return (
    <div className="car-stage">
      <div className="stage-light light-a" />
      <div className="stage-light light-b" />
      <div className="stage-floor" />
      <div className="car-shadow" />
      <div className="car-3d" style={{ "--car-color": color, "--car-angle": `${angle}deg` }}>
        <div className="car-body">
          <div className="car-roof" />
          <div className="car-window window-front" />
          <div className="car-window window-back" />
          <div className="car-door-line" />
          <div className="car-side-highlight" />
          <div className="car-front-light" />
          <div className="car-rear-light" />
          <div className="car-grille" />
          <div className="car-bumper" />
          <div className="car-wheel wheel-front">
            <div className={`wheel-rim ${wheel.toLowerCase()}`}><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="car-wheel wheel-back">
            <div className={`wheel-rim ${wheel.toLowerCase()}`}><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
      <div className="stage-caption"><span>VELOCE / DESIGN 014</span><span>SCULPTED IN MOTION</span></div>
    </div>
  )
}

function OptionButton({ active, children, onClick }) {
  return <button type="button" className={`option-button ${active ? "active" : ""}`} onClick={onClick}>{children}</button>
}

export default function Day14() {
  const [color, setColor] = useState(carColors[0])
  const [wheel, setWheel] = useState(wheelStyles[0])
  const [selectedPackages, setSelectedPackages] = useState([])
  const [angle, setAngle] = useState(0)
  const [tab, setTab] = useState("Exterior")
  const [showBooking, setShowBooking] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [booked, setBooked] = useState(false)

  const packagePrice = selectedPackages.reduce((sum, item) => sum + item.price, 0)
  const total = basePrice + color.price + wheel.price + packagePrice

  function togglePackage(item) {
    setSelectedPackages(current => current.some(option => option.id === item.id)
      ? current.filter(option => option.id !== item.id)
      : [...current, item])
  }

  function resetBuild() {
    setColor(carColors[0])
    setWheel(wheelStyles[0])
    setSelectedPackages([])
    setAngle(0)
    setTab("Exterior")
  }

  return (
    <main className="veloce">
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />

      <header className="velo-header">
        <a href="#home" className="velo-brand">
          <span className="brand-emblem">V</span>
          <span>VELOCE<small> AUTOMOTIVE STUDIO</small></span>
        </a>
        <nav className="velo-nav">
          <a href="#configure">Configurator</a>
          <a href="#craft">Craftsmanship</a>
          <a href="#build">Your build</a>
        </nav>
        <button className="header-action" onClick={() => setShowBooking(true)}>Book a studio visit <span>↗</span></button>
      </header>

      <section className="velo-hero" id="home">
        <div className="hero-copy">
          <div className="velo-kicker"><i /> BESPOKE AUTOMOTIVE / 2026</div>
          <h1>Make it<br /><em>unmistakably</em><br /> yours.</h1>
          <p>Precision engineering meets personal expression. Shape every detail of your next driving experience.</p>
          <div className="hero-buttons">
            <a href="#configure" className="primary-cta">Configure your car <span>↘</span></a>
            <span className="hero-note">01 / PERSONALIZATION STUDIO</span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-ring ring-one" />
          <div className="hero-ring ring-two" />
          <div className="hero-orb" />
          <div className="hero-art-label"><span>DESIGN YOUR<br />OWN LEGACY</span><b>V.</b></div>
        </div>
      </section>

      <section className="configurator" id="configure">
        <div className="config-heading">
          <div><span className="velo-kicker">THE CONFIGURATION LAB / 01</span><h2>Your vision.<br /><em>Our craftsmanship.</em></h2></div>
          <div className="config-heading-right"><span>MODEL</span><strong>V-01 GT</strong><span>GRAND TOURING / COUPE</span></div>
        </div>

        <div className="config-layout">
          <div className="visual-column">
            <div className="visual-topline"><span><i className="live-indicator" /> LIVE CONFIGURATION</span><button onClick={() => setAngle(value => value === 0 ? 18 : 0)}>{angle === 0 ? "Change perspective ↗" : "Reset view ↙"}</button></div>
            <CarVisual color={color.value} wheel={wheel.name} angle={angle} />
            <div className="visual-footer"><span>HAND-FINISHED DETAILS</span><span>01 / 03 <b>────────</b></span></div>
          </div>

          <aside className="config-panel">
            <div className="config-tabs">
              {["Exterior", "Wheels", "Packages"].map(item => <button key={item} className={tab === item ? "selected" : ""} onClick={() => setTab(item)}>{item}</button>)}
            </div>

            {tab === "Exterior" && <div className="option-section">
              <div className="option-title"><div><span>01</span><strong>Paint finish</strong></div><small>METALLIC / PEARL</small></div>
              <div className="color-options">
                {carColors.map(item => <button key={item.name} title={item.name} className={`color-choice ${color.name === item.name ? "chosen" : ""}`} style={{ "--swatch": item.value }} onClick={() => setColor(item)}><i /></button>)}
              </div>
              <div className="selected-color"><span>Selected finish</span><strong>{color.name}</strong><small>{color.price ? `+$${color.price.toLocaleString()}` : "Included"}</small></div>
              <div className="finish-preview"><div className="finish-sample" style={{ background: `linear-gradient(140deg, ${color.value}, #17362f)` }} /><div><span>Deep gloss finish</span><small>Multi-layer hand-polished coating</small></div><span>✦</span></div>
            </div>}

            {tab === "Wheels" && <div className="option-section">
              <div className="option-title"><div><span>02</span><strong>Wheel design</strong></div><small>FORGED ALLOY</small></div>
              <div className="wheel-options">{wheelStyles.map(item => <OptionButton key={item.name} active={wheel.name === item.name} onClick={() => setWheel(item)}><span className="wheel-mini"><i /></span><strong>{item.name}</strong><small>{item.price ? `+$${item.price.toLocaleString()}` : "Included"}</small></OptionButton>)}</div>
              <div className="wheel-note"><span>◈</span><div><strong>Precision forged</strong><small>Lightweight construction for improved road feel.</small></div></div>
            </div>}

            {tab === "Packages" && <div className="option-section">
              <div className="option-title"><div><span>03</span><strong>Enhancement packs</strong></div><small>OPTIONAL</small></div>
              <div className="package-options">{packages.map(item => {
                const active = selectedPackages.some(option => option.id === item.id)
                return <button key={item.id} className={`package-option ${active ? "chosen" : ""}`} onClick={() => togglePackage(item)}>
                  <span className="package-check">{active ? "✓" : "+"}</span><span className="package-copy"><strong>{item.name}</strong><small>{item.description}</small></span><b>+${item.price.toLocaleString()}</b>
                </button>
              })}</div>
            </div>}

            <div className="config-total"><div><span>ESTIMATED BUILD</span><strong>${total.toLocaleString()}</strong></div><small>Taxes and delivery excluded</small></div>
            <button className="build-cta" onClick={() => setShowBooking(true)}>Reserve your build <span>↗</span></button>
            <button className="reset-build" onClick={resetBuild}>↺ Reset configuration</button>
          </aside>
        </div>
      </section>

      <section className="craft-section" id="craft">
        <div className="craft-heading"><span className="velo-kicker">BEYOND THE ORDINARY / 02</span><h2>Every detail has<br /><em>a purpose.</em></h2></div>
        <div className="craft-grid">
          <article className="craft-card craft-card-one"><span>01 / MATERIALS</span><div className="craft-object metal-object" /><h3>Form meets function.</h3><p>Materials selected for character, durability and a tactile experience.</p></article>
          <article className="craft-card craft-card-two"><span>02 / ENGINEERING</span><div className="craft-object energy-object"><i /><i /><i /></div><h3>Precision in motion.</h3><p>Every component is tuned to deliver a more connected drive.</p></article>
          <article className="craft-card craft-card-three"><span>03 / PERSONAL</span><div className="craft-object detail-object"><b>V</b></div><h3>Made distinctly yours.</h3><p>A thoughtful balance of individuality and timeless design.</p></article>
        </div>
      </section>

      <section className="build-summary" id="build">
        <div><span className="velo-kicker">YOUR DESIGN / READY WHEN YOU ARE</span><h2>A car that feels<br /><em>like yours.</em></h2><p>Bring your vision to life with a dedicated Veloce specialist.</p></div>
        <div className="summary-right"><strong>${total.toLocaleString()}</strong><span>Current estimated configuration</span><button onClick={() => setShowBooking(true)}>Book a consultation ↗</button></div>
      </section>

      <footer className="velo-footer"><a href="#home" className="velo-brand"><span className="brand-emblem">V</span><span>VELOCE<small> AUTOMOTIVE STUDIO</small></span></a><span>DESIGNED WITH INTENTION. BUILT TO MOVE.</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button></footer>

      {showBooking && <div className="booking-overlay" onClick={() => setShowBooking(false)}>
        <form className="booking-modal" onSubmit={event => { event.preventDefault(); setBooked(true); }} onClick={event => event.stopPropagation()}>
          <button type="button" className="booking-close" onClick={() => { setShowBooking(false); setBooked(false); }}>×</button>
          {!booked ? <>
            <span className="velo-kicker">YOUR VELOCE EXPERIENCE</span><h2>Let's make it<br /><em>personal.</em></h2><p>Leave your details and our studio specialist will be in touch.</p>
            <label>Your name<input value={name} onChange={event => setName(event.target.value)} placeholder="Full name" required /></label>
            <label>Email address<input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" required /></label>
            <div className="booking-estimate"><span>Your current build</span><strong>${total.toLocaleString()}</strong></div>
            <button className="build-cta" type="submit">Request consultation ↗</button>
          </> : <div className="booking-success"><div>✓</div><h2>Beautiful choice.</h2><p>Your demo consultation request has been recorded locally.</p><button className="build-cta" type="button" onClick={() => { setShowBooking(false); setBooked(false); }}>Back to studio</button></div>}
        </form>
      </div>}
    </main>
  )
}