// src/ui/screens/EventScreen.jsx
import Button from '../componentes/Button';
import { getChoices } from '../../game/logica/engine';

export default function EventScreen({ scenario, onChoose }) {
  const choices = getChoices(scenario);

  return (
    <div style={{ padding: 24, maxWidth: 520, margin: '0 auto' }}>
      <h1>{scenario.situationTitle}</h1>
      <p>{scenario.kidFriendlyContext}</p>

      {choices.map((c, i) => (
        <div key={c.key} style={{ marginBottom: 20 }}>
          <Button variant={i === 1 ? 'danger' : 'primary'} onClick={() => onChoose(c)}>
            {c.action}
          </Button>
          <small style={{ display: 'block', marginTop: 12 }}>
            {c.sacrifice} · {c.benefit}
          </small>
        </div>
      ))}
    </div>
  );
}