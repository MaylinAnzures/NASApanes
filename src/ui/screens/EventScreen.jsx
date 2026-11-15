import { useState } from 'react';
import './Screens.css';
import Button from '../componentes/Button';
import SelectionCard from '../componentes/SelectionCard';
import DialogueScreen from '../componentes/DialogueScreen';
import { METRIC_ICON } from '../componentes/Icon';
import { getChoices } from '../../game/logica/engine';

// El icono de cada opción sale del recurso que más mejora (o del primero que cambia).
function iconFor(effects) {
  const entries = Object.entries(effects).filter(([, v]) => v !== 0);
  const best = entries.sort((a, b) => b[1] - a[1])[0];
  return METRIC_ICON[best?.[0]] ?? 'info';
}

/**
 * Fase 1: se elige una tarjeta y se confirma.
 * Fase 2: se muestra el resultado (choice.result) y, al continuar, se aplica con onChoose.
 */
export default function EventScreen({ scenario, onChoose }) {
  const choices = getChoices(scenario);
  const [picked, setPicked] = useState(null);
  const [phase, setPhase] = useState('choose');
  const choice = choices.find((c) => c.key === picked);

  if (phase === 'result' && choice) {
    return (
      <div className="scrim">
        <DialogueScreen position="center" text={choice.result} onContinue={() => onChoose(choice)} />
      </div>
    );
  }

  return (
    <div className="scrim">
      <section className="event ui-fade" aria-labelledby="ev-title">
        <h1 id="ev-title" className="event__title">{scenario.situationTitle}</h1>
        <p className="event__ctx">{scenario.kidFriendlyContext}</p>

        <div className="event__cards" role="radiogroup" aria-label="Opciones">
          {choices.map((c) => (
            <SelectionCard key={c.key} icon={iconFor(c.effects)} title={c.action}
              chips={[c.benefit, c.sacrifice]} selected={picked === c.key}
              onSelect={() => setPicked(c.key)} />
          ))}
        </div>

        <Button disabled={!choice} icon="check"
          onClick={() => setPhase('result')}>
          ¡Elegir esta!
        </Button>
        {!choice && <p className="event__hint">Toca una tarjeta para elegir</p>}
      </section>
    </div>
  );
}
