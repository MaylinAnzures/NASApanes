import { useState } from 'react';
import './MissionScreens.css';
import Button from '../componentes/Button';
import MissionFrame from '../componentes/MissionFrame';
import { sfx } from '../../game/sfx';
import { MISSION_LIST } from '../../game/data/missions';

const BASE = import.meta.env.BASE_URL;

// "Elige tu misión": Luna o Marte (referencia 2).
export default function MissionSelectScreen({ onChoose }) {
  const [sel, setSel] = useState(null);
  return (
    <div className="msel ui-fade">
      <MissionFrame corners="top" className="msel__panel" aria-labelledby="msel-title">
        <h1 id="msel-title" className="msel__title">¡Elige tu misión!</h1>
        <div className="msel__cards" role="radiogroup" aria-label="Misiones">
          {MISSION_LIST.map((m) => (
            <button key={m.id} type="button" role="radio" aria-checked={sel === m.id}
              className={`pcard ${sel === m.id ? 'is-selected' : ''}`}
              onMouseEnter={() => sfx.hover()} onClick={() => { sfx.select(); setSel(m.id); }}>
              <img src={`${BASE}assets/planetas/${m.planet}.png`} alt="" />
              <span>{m.label}</span>
            </button>
          ))}
        </div>
        <div className="msel__go">
          <Button focused disabled={!sel} icon="check" onClick={() => onChoose(sel)}>¡Elegir!</Button>
          {!sel && <p className="msel__hint">¡Toca un planeta para elegirlo!</p>}
        </div>
      </MissionFrame>
    </div>
  );
}
