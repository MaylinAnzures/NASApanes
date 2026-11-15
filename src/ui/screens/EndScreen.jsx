import { useEffect } from 'react';
import './Screens.css';
import Button from '../componentes/Button';
import Chip from '../componentes/Chip';
import { GridPanel } from '../componentes/Panel';
import { sfx } from '../../game/sfx';
import { WIN, LOSS, STATS } from '../../game/data/endings';
import { LAST_DAY } from '../../game/logica/engine';

// "**negrita**" -> <b>
const rich = (str) => str.split('**').map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p));

/**
 * Final de la misión.
 * outcome: { won: true } | { won: false, reason: 'agua' | ... }
 */
export default function EndScreen({ outcome, state, day, onRetry, onMenu }) {
  const won = outcome.won;
  const info = won ? WIN : LOSS[outcome.reason];

  useEffect(() => { (won ? sfx.good : sfx.bad)(); }, [won]);

  return (
    <div className="scrim">
      <GridPanel className={`endcard ui-fade ${won ? 'endcard--win' : ''}`} role="dialog" aria-labelledby="end-title">
        <h1 id="end-title" className="endcard__title">{info.title}</h1>
        <p className="endcard__text">{rich(info.text)}</p>

        <p className="endcard__day">
          {won ? `¡Sobreviviste los ${LAST_DAY} días!` : `Llegaste al día ${day} de ${LAST_DAY}.`}
        </p>

        <div className="endcard__stats" aria-label="Lo que te quedó">
          {STATS.map(([k, label, unit]) => (
            <Chip key={k} tone={!won && k === outcome.reason ? 'danger' : 'dark'}>
              {label}: {Math.round(state.resources[k] * 10) / 10}{unit}
            </Chip>
          ))}
        </div>

        {!won && <p className="endcard__tip">{info.tip}</p>}

        <div className="endcard__buttons">
          <Button autoFocus icon="play" onClick={onRetry}>{won ? 'Jugar otra vez' : '¡Intentar otra vez!'}</Button>
          <Button variant="light" icon="back" onClick={onMenu}>Volver al menú</Button>
        </div>
      </GridPanel>
    </div>
  );
}
