import React from "react";
import AssetArtwork from "./AssetArtwork";

export default function AssetCard({ asset, saved, onSave, onAdd }) {
  return (
    <article className="asset-card">
      <div className="asset-card-visual">
        <AssetArtwork asset={asset} />
        <span className="asset-tag">{asset.tag}</span>
        <button className={`asset-save ${saved ? "is-saved" : ""}`} onClick={() => onSave(asset.id)} aria-label="Save asset">{saved ? "♥" : "♡"}</button>
      </div>
      <div className="asset-card-info">
        <div className="asset-creator">{asset.creator}<span>✦ VERIFIED</span></div>
        <h3>{asset.name}</h3>
        <p>{asset.description}</p>
        <div className="asset-card-bottom">
          <div className="asset-price"><strong>${asset.price}</strong><del>${asset.oldPrice}</del></div>
          <span className="asset-rating">★ {asset.rating}</span>
        </div>
        <button className="asset-add" onClick={() => onAdd(asset)}>ADD TO COLLECTION <span>↗</span></button>
      </div>
    </article>
  );
}
