import React, { useState } from "react";

export default function FlightFact({ facts }) {
  const [active, setActive] = useState(0);

  const nextFact = () => setActive((current) => (current + 1) % facts.length);

  return (
    <div className="flight-fact-card">
      <div className="flight-fact-top">
        <span>FLIGHT INTELLIGENCE</span>
        <span>{String(active + 1).padStart(2, "0")} / {String(facts.length).padStart(2, "0")}</span>
      </div>
      <div className="flight-fact-icon">✳</div>
      <p>{facts[active]}</p>
      <button onClick={nextFact}>Discover another fact <span>↗</span></button>
    </div>
  );
}
