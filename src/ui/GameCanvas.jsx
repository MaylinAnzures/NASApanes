import { useEffect, useState } from 'react';
import { usePhaserGame } from '../hooks/usePhaserGame';
import { GAME_EVENTS } from '../bridge/gameEvents';

export function GameCanvas() {
  const { containerRef, eventBus } = usePhaserGame();
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);

  useEffect(() => {
    const handleScoreChanged = (value) => setScore(value);
    const handleHealthChanged = (value) => setHealth(value);

    eventBus.on(GAME_EVENTS.SCORE_CHANGED, handleScoreChanged);
    eventBus.on(GAME_EVENTS.PLAYER_HEALTH_CHANGED, handleHealthChanged);

    return () => {
      eventBus.off(GAME_EVENTS.SCORE_CHANGED, handleScoreChanged);
      eventBus.off(GAME_EVENTS.PLAYER_HEALTH_CHANGED, handleHealthChanged);
    };
  }, [eventBus]);

  const movePlayer = (direction) => {
    eventBus.emit(GAME_EVENTS.PLAYER_MOVE, direction);
  };

  return (
    <section className="game-shell">
      <div ref={containerRef} className="phaser-container" />
      <aside className="hud">
        <div className="stat"><span>Puntuación</span><strong>{score}</strong></div>
        <div className="stat"><span>Salud</span><strong>{health}%</strong></div>
        <div className="controls">
          <button type="button" onClick={() => movePlayer('left')}>Izquierda</button>
          <button type="button" onClick={() => movePlayer('right')}>Derecha</button>
          <button type="button" onClick={() => eventBus.emit(GAME_EVENTS.PLAYER_ATTACK)}>Atacar</button>
        </div>
      </aside>
    </section>
  );
}
