import './Controls.css';
import Icon from './Icon';
import { sfx } from '../../game/sfx';

// Par Atrás / Siguiente
export default function BackNext({ onBack, onNext, backLabel = 'Atrás', nextLabel = 'Siguiente', backDisabled, nextDisabled }) {
  return (
    <div className="backnext">
      <button type="button" className="backnext__back" disabled={backDisabled}
        onClick={() => { sfx.click(); onBack?.(); }}>
        <Icon name="back" /><span>{backLabel}</span>
      </button>
      <button type="button" className="backnext__next" disabled={nextDisabled}
        onClick={() => { sfx.click(); onNext?.(); }}>
        <span>{nextLabel}</span><Icon name="next" />
      </button>
    </div>
  );
}
