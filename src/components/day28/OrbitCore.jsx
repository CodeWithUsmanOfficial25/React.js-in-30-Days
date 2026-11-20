import React from "react";
import "./OrbitCore.css";

export default function OrbitCore() {
  return (
    <div className="nebula-universe">
      <div className="universe-backlight" />
      <div className="universe-grid" />
      <div className="cosmic-streak streak-a" />
      <div className="cosmic-streak streak-b" />
      <div className="cosmic-streak streak-c" />
      <div className="core-stage">
        <div className="core-aura aura-one" />
        <div className="core-aura aura-two" />
        <div className="core-orbit orbit-a"><span className="orbit-moon moon-a" /></div>
        <div className="core-orbit orbit-b"><span className="orbit-moon moon-b" /></div>
        <div className="core-orbit orbit-c"><span className="orbit-moon moon-c" /></div>
        <div className="core-orbit orbit-d"><span className="orbit-moon moon-d" /></div>
        <div className="core-orbit orbit-e"><span className="orbit-moon moon-e" /></div>
        <div className="core-sphere">
          <div className="sphere-surface">
            <div className="sphere-continent continent-a" />
            <div className="sphere-continent continent-b" />
            <div className="sphere-continent continent-c" />
            <div className="sphere-cloud cloud-a" />
            <div className="sphere-cloud cloud-b" />
            <div className="sphere-glint" />
          </div>
          <div className="sphere-inner-ring" />
        </div>
        <div className="core-crosshair crosshair-a" />
        <div className="core-crosshair crosshair-b" />
        <div className="core-label core-label-top">NEBULA / 001</div>
        <div className="core-label core-label-bottom">QUANTUM CORE ACTIVE</div>
        <div className="core-coordinate coordinate-a">X 284.09</div>
        <div className="core-coordinate coordinate-b">Y 091.72</div>
        <div className="core-coordinate coordinate-c">Z 442.16</div>
        <div className="core-particle particle-a" />
        <div className="core-particle particle-b" />
        <div className="core-particle particle-c" />
        <div className="core-particle particle-d" />
        <div className="core-particle particle-e" />
      </div>
      <div className="universe-side-note">INFINITE POSSIBILITIES<br />ONE CONNECTED UNIVERSE</div>
      <div className="universe-bottom-note"><span /> DEEP SPACE TRANSMISSION <b>LIVE</b></div>
    </div>
  );
}
