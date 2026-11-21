import React from "react";

export default function AssetArtwork({ asset }) {
  return (
    <div className={`asset-artwork artwork-${asset.color}`}>
      <div className="art-orbit art-orbit-one" />
      <div className="art-orbit art-orbit-two" />
      <div className="art-shadow" />
      <div className={`art-object object-${asset.shape}`}>
        {asset.shape === "type" ? (
          <><span>Aa</span><i>TYPE</i></>
        ) : asset.shape === "audio" ? (
          <div className="audio-waves">{Array.from({ length: 13 }).map((_, i) => <i key={i} style={{ "--wave": `${20 + ((i * 17) % 75)}px` }} />)}</div>
        ) : asset.shape === "orbit" ? (
          <><div className="orbit-disc">◈</div><i /><b /></>
        ) : asset.shape === "studio" ? (
          <><span>MAKE<br />IT<br /><em>YOURS.</em></span><i /></>
        ) : asset.shape === "commerce" ? (
          <><div className="commerce-tile">SHOP</div><div className="commerce-tile second">NOW ↗</div></>
        ) : (
          <><span>✣</span><i /><b /><em /></>
        )}
      </div>
      <span className="art-index">0{asset.id} / ASSET</span>
      <span className="art-spark">✳</span>
    </div>
  );
}
