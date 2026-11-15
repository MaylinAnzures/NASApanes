import { useCallback, useEffect, useRef, useState } from 'react';
import './styles/global.css';
import './ui/screens/Screens.css';
import Stage from './ui/Stage';
import Button from './ui/componentes/Button';
import IconButton from './ui/componentes/IconButton';
import MenuScreen from './ui/screens/MenuScreen';
import IntroScreen from './ui/screens/IntroScreen';
import EventScreen from './ui/screens/EventScreen';
import EndScreen from './ui/screens/EndScreen';
import PauseMenu from './ui/screens/PauseMenu';
import MissionSelectScreen from './ui/screens/MissionSelectScreen';
import BriefingScreen from './ui/screens/BriefingScreen';
import DailyReport from './ui/screens/DailyReport';
import { MISSIONS } from './game/data/missions';
import UiKit from './ui/screens/UiKit';
import { NASA_GAME_SCENARIOS } from './game/data/nasaGameData';
import {
  createInitialState, pickScenario, applyChoice, advanceDay, getOutcome, lastPlayedDay, LAST_DAY,
} from './game/logica/engine';
import { sfx } from './game/sfx';
import { eventBus } from './bridge/eventBus';
import { GAME_EVENTS } from './bridge/gameEvents';

const STAGE_OF = { menu: 'menu', select: 'select', briefing: 'briefing', game: 'cabin' };

export default function App() {
  // /?ui abre la hoja de componentes
  if (new URLSearchParams(window.location.search).has('ui')) return <UiKit />;
  return <Game />;
}

function Game() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'intro' | 'select' | 'briefing' | 'game'
  const [missionId, setMissionId] = useState('luna');
  const mission = MISSIONS[missionId];
  const [report, setReport] = useState(null); // resumen del día que se muestra tras pasar de día
  const [introStage, setIntroStage] = useState('intro');
  const [state, setState] = useState(() => createInitialState(MISSIONS.luna));
  const [scenario, setScenario] = useState(null); // si hay escenario, se muestra encima del juego
  const [paused, setPaused] = useState(false);

  const outcome = getOutcome(state); // null mientras se juega; { won, reason } al terminar
  const shownDay = outcome ? lastPlayedDay(state) : Math.min(state.day, LAST_DAY);

  const stage = screen === 'intro' ? introStage : STAGE_OF[screen];

  // Phaser avisa cuando está listo; entonces le mandamos fondo y recursos actuales
  const latest = useRef({});
  latest.current = { stage, resources: state.resources, mission };
  useEffect(() => {
    const send = () => {
      eventBus.emit(GAME_EVENTS.MISSION_CHANGED, { planet: latest.current.mission.planet, max: latest.current.mission.resources });
      eventBus.emit(GAME_EVENTS.STAGE_CHANGED, latest.current.stage);
      eventBus.emit(GAME_EVENTS.RESOURCES_CHANGED, latest.current.resources);
    };
    eventBus.on(GAME_EVENTS.SCENE_READY, send);
    return () => eventBus.off(GAME_EVENTS.SCENE_READY, send);
  }, []);
  useEffect(() => { eventBus.emit(GAME_EVENTS.MISSION_CHANGED, { planet: mission.planet, max: mission.resources }); }, [mission]);
  useEffect(() => { eventBus.emit(GAME_EVENTS.STAGE_CHANGED, stage); }, [stage]);
  useEffect(() => { eventBus.emit(GAME_EVENTS.RESOURCES_CHANGED, state.resources); }, [state.resources]);

  // Pasa el día: el desgaste (con azar) se calcula una sola vez, y el resumen explica lo que bajó.
  const passDay = useCallback((from) => {
    const next = advanceDay(from, mission);
    setState(next);
    setReport(getOutcome(next) ? null : next.lastReport);
    eventBus.emit(GAME_EVENTS.DAY_ADVANCED);
    sfx.day();
  }, [mission]);

  const nextDay = () => {
    const s = pickScenario(state, NASA_GAME_SCENARIOS.scenarios);
    if (s) { setScenario(s); eventBus.emit(GAME_EVENTS.SCENARIO_TRIGGERED, s); }
    else passDay(state);
  };

  const handleChoose = (choice) => {
    const sc = scenario;
    const before = state.resources;
    const chosen = applyChoice(state, choice, sc);
    const worse = Object.keys(chosen.resources).some((k) => chosen.resources[k] < before[k]);
    (worse ? sfx.bad : sfx.good)();
    setScenario(null);
    passDay(chosen);
  };

  const reset = (m = mission) => { setState(createInitialState(m)); setScenario(null); setReport(null); setPaused(false); };
  const restart = () => { reset(); setScreen('menu'); };   // volver al menú
  const retry = () => { reset(); setScreen('game'); };    // misma misión, sin repetir la intro

  return (
    <Stage>
      {screen === 'menu' && <MenuScreen onPlay={() => { setIntroStage('intro'); setScreen('intro'); }} />}

      {screen === 'intro' && <IntroScreen onStage={setIntroStage} onDone={() => setScreen('select')} />}

      {screen === 'select' && (
        <MissionSelectScreen onChoose={(id) => { setMissionId(id); reset(MISSIONS[id]); setScreen('briefing'); }} />
      )}

      {screen === 'briefing' && (
        <BriefingScreen mission={mission} onStart={() => setScreen('game')} onBack={() => setScreen('select')} />
      )}

      {screen === 'game' && (
        <>
          <div className="hud-day">
            <IconButton icon="pause" label="Pausa" onClick={() => setPaused(true)} />
            <div className="hud-day__pill">Día {shownDay} / {LAST_DAY}</div>
          </div>

          {outcome ? (
            <EndScreen outcome={outcome} state={state} day={shownDay} onRetry={retry} onMenu={restart} />
          ) : scenario ? (
            <EventScreen key={scenario.scenarioId} scenario={scenario} onChoose={handleChoose} />
          ) : report ? (
            <DailyReport key={report.day} report={report} onContinue={() => setReport(null)} />
          ) : (
            <div className="hud-bottom">
              <Button icon="play" autoFocus onClick={nextDay}>Siguiente día</Button>
            </div>
          )}

          {paused && <PauseMenu onResume={() => setPaused(false)} onExit={restart} />}
        </>
      )}
    </Stage>
  );
}
