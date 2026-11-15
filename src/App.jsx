import { useEffect, useState } from 'react';
import './styles/global.css';
import Button from './ui/componentes/Button';
import MenuScreen from './ui/screens/MenuScreen';
import EventScreen from './ui/screens/EventScreen';
import GameCanvas from './ui/GameCanvas';
import { NASA_GAME_SCENARIOS } from './game/data/nasaGameData';
import {
  createInitialState, pickScenario, applyChoice, advanceDay, isGameOver,
} from './game/logica/engine';
import { eventBus } from './bridge/eventBus';
import { GAME_EVENTS } from './bridge/gameEvents';

export default function App() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'game'
  const [state, setState] = useState(createInitialState);
  const [scenario, setScenario] = useState(null); // si hay escenario, se muestra encima del juego

  // Phaser avisa cuando está listo; entonces le mandamos los recursos actuales
  useEffect(() => {
    const send = () => eventBus.emit(GAME_EVENTS.RESOURCES_CHANGED, state.resources);
    eventBus.on(GAME_EVENTS.SCENE_READY, send);
    send();
    return () => eventBus.off(GAME_EVENTS.SCENE_READY, send);
  }, [state.resources]);

  const nextDay = () => {
    const s = pickScenario(state, NASA_GAME_SCENARIOS.scenarios);
    if (s) setScenario(s);
    else setState(advanceDay);
  };

  const handleChoose = (choice) => {
    setState((st) => advanceDay(applyChoice(st, choice, scenario)));
    setScenario(null);
  };

  const restart = () => { setState(createInitialState()); setScenario(null); setScreen('menu'); };

  if (screen === 'menu') return <MenuScreen onPlay={() => setScreen('game')} />;

  return (
    <div className="game-root">
      {/* Phaser SIEMPRE montado mientras se juega */}
      <GameCanvas />
      <div className="hud-top">Día {Math.min(state.day, 14)}</div>

      {isGameOver(state) ? (
        <div className="overlay">
          <div style={{ textAlign: 'center' }}>
            <h1>Fin de la misión</h1>
            <p>Llegaste al día {state.day}.</p>
            <Button onClick={restart}>Volver al menú</Button>
          </div>
        </div>
      ) : scenario ? (
        <div className="overlay">
          <EventScreen scenario={scenario} onChoose={handleChoose} />
        </div>
      ) : (
        <div className="hud-bottom">
          <Button onClick={nextDay}>Siguiente día</Button>
        </div>
      )}
    </div>
  );
}
