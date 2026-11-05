import React from "react";

function GameCard({ game, onPlay, index }) {
  return (
    <article className={`av-game-card av-card-${game.color}`} style={{ "--card-index": index }}>
      <div className="av-card-top">
        <span className="av-genre">{game.genre}</span>
        <span className="av-card-number">0{game.id}</span>
      </div>

      <div className="av-game-art">
        <div className="av-art-orbit av-orbit-one"></div>
        <div className="av-art-orbit av-orbit-two"></div>
        <div className="av-game-icon">{game.icon}</div>
        <span className="av-art-spark av-spark-one">✦</span>
        <span className="av-art-spark av-spark-two">✧</span>
      </div>

      <div className="av-card-details">
        <div className="av-card-meta">
          <span>{game.difficulty}</span>
          <span>{game.players}</span>
        </div>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <button className="av-card-play" disabled={game.difficulty === "Coming Soon"} onClick={onPlay}>
          {game.difficulty === "Coming Soon" ? "Coming Soon" : "Play Game"} <span>↗</span>
        </button>
      </div>
    </article>
  );
}

export default GameCard;
