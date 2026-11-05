import React, { useEffect, useRef, useState } from "react";
import GameCard from "../components/day16/GameCard";
import { arcadeGames, memoryEmojis } from "../data/day16Data";
import "./Day16.css";

function createDeck() {
  return [...memoryEmojis, ...memoryEmojis]
    .map((emoji, index) => ({ id: index, emoji, matched: false }))
    .sort(() => Math.random() - 0.5);
}

function Day16() {
  const [activeGame, setActiveGame] = useState(null);
  const [memoryCards, setMemoryCards] = useState(createDeck);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [reactionPhase, setReactionPhase] = useState("ready");
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(0);

  const matchedPairs = memoryCards.filter((card) => card.matched).length / 2;
  const memoryComplete = matchedPairs === memoryEmojis.length;
  const memoryScore = Math.max(0, matchedPairs * 100 - moves * 5);

  useEffect(() => {
    if (selected.length !== 2) return;

    const timer = setTimeout(() => {
      const [first, second] = selected;
      const firstCard = memoryCards.find((card) => card.id === first);
      const secondCard = memoryCards.find((card) => card.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setMemoryCards((previous) =>
          previous.map((card) =>
            selected.includes(card.id) ? { ...card, matched: true } : card
          )
        );
      }

      setMoves((previous) => previous + 1);
      setSelected([]);
    }, 700);

    return () => clearTimeout(timer);
  }, [selected, memoryCards]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const resetMemory = () => {
    setMemoryCards(createDeck());
    setSelected([]);
    setMoves(0);
  };

  const pickMemoryCard = (id) => {
    if (selected.length === 2 || selected.includes(id)) return;
    const card = memoryCards.find((item) => item.id === id);
    if (!card || card.matched) return;
    setSelected((previous) => [...previous, id]);
  };

  const startReaction = () => {
    clearTimeout(timeoutRef.current);
    setReactionTime(null);
    setReactionPhase("waiting");
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setReactionPhase("go");
    }, 1600 + Math.random() * 2200);
  };

  const hitReaction = () => {
    if (reactionPhase === "waiting") {
      clearTimeout(timeoutRef.current);
      setReactionPhase("early");
      return;
    }

    if (reactionPhase === "go") {
      const elapsed = Date.now() - startTimeRef.current;
      setReactionTime(elapsed);
      setBestTime((previous) => previous === null ? elapsed : Math.min(previous, elapsed));
      setReactionPhase("result");
      setGamesPlayed((previous) => previous + 1);
    }
  };

  const openGame = (id) => {
    setActiveGame(id);
    if (id === 1) resetMemory();
    if (id === 2) {
      clearTimeout(timeoutRef.current);
      setReactionPhase("ready");
      setReactionTime(null);
    }
  };

  const closeGame = () => {
    clearTimeout(timeoutRef.current);
    setActiveGame(null);
  };

  return (
    <div className="arcadeverse">
      <div className="av-topbar">
        <div className="av-topbar-inner">
          <span><i></i> ARCADEVERSE ONLINE</span>
          <span className="av-topbar-right">THE NEXT LEVEL STARTS HERE <b>✦</b></span>
        </div>
      </div>

      <header className="av-header">
        <a className="av-brand" href="#av-home">
          <span className="av-brand-mark">A<span>V</span></span>
          <span>ARCADE<span>VERSE</span><small>PLAY BEYOND LIMITS</small></span>
        </a>

        <nav className="av-navigation">
          <a href="#av-home">Home</a>
          <a href="#av-games">Games</a>
          <a href="#av-stats">Leaderboard</a>
          <a href="#av-about">About</a>
        </nav>

        <div className="av-header-right">
          <span className="av-player-status"><i></i> PLAYER 01</span>
          <button className="av-header-button" onClick={() => setSoundOn(!soundOn)}>
            {soundOn ? "♫ SOUND ON" : "♫ SOUND OFF"}
          </button>
        </div>
      </header>

      <main id="av-home">
        <section className="av-hero">
          <div className="av-hero-grid"></div>
          <div className="av-hero-copy">
            <div className="av-hero-label"><span>✦</span> WELCOME TO THE PLAYGROUND</div>
            <h1>READY.<br /><span>PLAYER</span><br />ONE<span className="av-title-dot">.</span></h1>
            <p>Enter a world of challenges, reflexes and pure arcade energy. Your next favorite game is just one click away.</p>
            <div className="av-hero-actions">
              <a href="#av-games" className="av-main-button">EXPLORE GAMES <span>↗</span></a>
              <div className="av-hero-caption"><span className="av-caption-icon">▶</span><span>NO LIMITS. JUST PLAY.<small>YOUR ARENA AWAITS</small></span></div>
            </div>
            <div className="av-hero-stats">
              <div><strong>04</strong><span>ARCADE WORLDS</span></div>
              <div><strong>02</strong><span>PLAYABLE GAMES</span></div>
              <div><strong>∞</strong><span>WAYS TO HAVE FUN</span></div>
            </div>
          </div>

          <div className="av-hero-stage">
            <div className="av-stage-ring av-ring-one"></div>
            <div className="av-stage-ring av-ring-two"></div>
            <div className="av-stage-platform"></div>
            <div className="av-stage-controller">
              <div className="av-controller-body">
                <div className="av-dpad"><span></span><i></i></div>
                <div className="av-controller-center"><span></span><span></span></div>
                <div className="av-controller-buttons"><i></i><i></i><i></i><i></i></div>
              </div>
            </div>
            <div className="av-stage-chip av-chip-top"><span>✦</span> GAME ON</div>
            <div className="av-stage-chip av-chip-bottom">LEVEL 01 <b>◆ ◆ ◆</b></div>
            <span className="av-stage-cross av-cross-one">✣</span>
            <span className="av-stage-cross av-cross-two">✦</span>
          </div>
          <div className="av-hero-index">01 / THE ARCADE EXPERIENCE</div>
        </section>

        <section className="av-ticker">
          <div className="av-ticker-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <div className="av-ticker-group" key={index}>
                <span>PLAY</span><b>✦</b><span>COMPETE</span><b>✦</b><span>REPEAT</span><b>✦</b><span>LEVEL UP</span><b>✦</b>
              </div>
            ))}
          </div>
        </section>

        <section className="av-games-section" id="av-games">
          <div className="av-section-heading">
            <div>
              <span className="av-section-kicker">CHOOSE YOUR CHALLENGE / 001</span>
              <h2>THE <span>GAME</span> ZONE.</h2>
              <p>Pick your arena. Make your move. Own your score.</p>
            </div>
            <div className="av-heading-decoration"><span>AV</span><small>ARCADE<br />COLLECTION</small></div>
          </div>

          <div className="av-game-grid">
            {arcadeGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} onPlay={() => openGame(game.id)} />
            ))}
          </div>
        </section>

        <section className="av-feature" id="av-stats">
          <div className="av-feature-copy">
            <span className="av-section-kicker">YOUR PERFORMANCE / 002</span>
            <h2>BUILT TO<br /><span>BREAK</span> RECORDS.</h2>
            <p>Every round is a new opportunity to sharpen your skills. Keep playing, improve your reflexes and beat your personal best.</p>
            <a href="#av-games" className="av-outline-button">CHALLENGE YOURSELF ↗</a>
          </div>

          <div className="av-stats-board">
            <div className="av-stats-top"><span>PLAYER DASHBOARD</span><span className="av-live-dot">● LIVE SESSION</span></div>
            <div className="av-big-stat"><strong>{gamesPlayed.toString().padStart(2, "0")}</strong><span>REACTION ROUNDS<br />COMPLETED</span></div>
            <div className="av-stat-divider"></div>
            <div className="av-small-stats">
              <div><span>BEST REACTION</span><strong>{bestTime === null ? "—" : `${bestTime} ms`}</strong></div>
              <div><span>MEMORY SCORE</span><strong>{memoryScore.toString().padStart(3, "0")}</strong></div>
            </div>
            <div className="av-board-decoration">PLAYER_01 <span>✦</span></div>
          </div>
        </section>

        <section className="av-about" id="av-about">
          <span className="av-about-icon">✳</span>
          <span className="av-section-kicker">ONE ARENA. ENDLESS ENERGY.</span>
          <h2>GAME FACE <span>ON.</span></h2>
          <p>Designed for curious minds, quick fingers and players who never stop leveling up.</p>
          <a href="#av-games">FIND YOUR NEXT GAME ↓</a>
        </section>
      </main>

      <footer className="av-footer">
        <a className="av-brand" href="#av-home">
          <span className="av-brand-mark">A<span>V</span></span>
          <span>ARCADE<span>VERSE</span><small>PLAY BEYOND LIMITS</small></span>
        </a>
        <span>© 2026 ARCADEVERSE. BUILT TO PLAY.</span>
        <a href="#av-home">BACK TO TOP ↑</a>
      </footer>

      {activeGame === 1 && (
        <div className="av-modal-backdrop" onClick={closeGame}>
          <section className="av-game-modal av-memory-modal" onClick={(event) => event.stopPropagation()}>
            <div className="av-modal-header">
              <div><span className="av-section-kicker">MINI GAME / 001</span><h2>MEMORY <span>MATRIX.</span></h2></div>
              <button onClick={closeGame} className="av-modal-close">✕</button>
            </div>
            <div className="av-memory-stats">
              <div><span>MOVES</span><strong>{moves}</strong></div>
              <div><span>MATCHED</span><strong>{matchedPairs}/{memoryEmojis.length}</strong></div>
              <div><span>SCORE</span><strong>{memoryScore}</strong></div>
            </div>
            <p className="av-game-instruction">Find all six matching pairs. Flip two cards at a time!</p>
            <div className="av-memory-grid">
              {memoryCards.map((card) => {
                const flipped = selected.includes(card.id) || card.matched;
                return (
                  <button
                    key={card.id}
                    className={`av-memory-card ${flipped ? "av-memory-flipped" : ""} ${card.matched ? "av-memory-matched" : ""}`}
                    onClick={() => pickMemoryCard(card.id)}
                    disabled={flipped || selected.length === 2}
                  >
                    <span className="av-memory-card-inner">
                      <span className="av-memory-front">AV</span>
                      <span className="av-memory-back">{card.emoji}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {memoryComplete && <div className="av-win-message">🏆 LEVEL COMPLETE! Final score: {memoryScore}</div>}
            <button className="av-main-button av-reset-button" onClick={resetMemory}>↻ RESTART GAME</button>
          </section>
        </div>
      )}

      {activeGame === 2 && (
        <div className="av-modal-backdrop" onClick={closeGame}>
          <section className="av-game-modal av-reaction-modal" onClick={(event) => event.stopPropagation()}>
            <div className="av-modal-header">
              <div><span className="av-section-kicker">MINI GAME / 002</span><h2>REACTION <span>RUSH.</span></h2></div>
              <button onClick={closeGame} className="av-modal-close">✕</button>
            </div>
            <div className="av-reaction-board">
              <div className={`av-reaction-target av-target-${reactionPhase}`} onClick={hitReaction}>
                {reactionPhase === "ready" && <><span>⚡</span><strong>READY?</strong><small>PRESS START TO PLAY</small></>}
                {reactionPhase === "waiting" && <><span>⌛</span><strong>WAIT...</strong><small>DON'T CLICK YET!</small></>}
                {reactionPhase === "go" && <><span>✦</span><strong>CLICK!</strong><small>AS FAST AS YOU CAN</small></>}
                {reactionPhase === "early" && <><span>✕</span><strong>TOO EARLY!</strong><small>WAIT FOR ORANGE</small></>}
                {reactionPhase === "result" && <><span>🏆</span><strong>{reactionTime} MS</strong><small>YOUR REACTION TIME</small></>}
              </div>
            </div>
            <div className="av-reaction-best">
              <span>PERSONAL BEST</span><strong>{bestTime === null ? "NOT SET" : `${bestTime} MS`}</strong>
            </div>
            <button className="av-main-button av-reaction-start" onClick={startReaction}>
              {reactionPhase === "ready" ? "START CHALLENGE ↗" : "TRY AGAIN ↻"}
            </button>
            <p className="av-game-instruction">Wait for the orange signal, then click the target as quickly as possible.</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default Day16;
