import React from "react";

export default function SignalCard({ item, index }) {
  return (
    <article className={`signal-card signal-${item.tone}`} style={{ "--card-index": index }}>
      <div className="signal-card-top">
        <span className="signal-number">{item.id}</span>
        <span className="signal-symbol">{item.symbol}</span>
      </div>
      <div className="signal-card-title">{item.name}</div>
      <p>{item.type}</p>
      <div className="signal-progress"><span style={{ width: `${item.progress}%` }} /></div>
      <div className="signal-card-bottom">
        <span className="signal-status"><i />{item.status}</span>
        <strong>{item.progress}%</strong>
      </div>
      <div className="signal-card-glow" />
    </article>
  );
}
