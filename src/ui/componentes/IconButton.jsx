import './Controls.css';
import Icon from './Icon';
import { sfx } from '../../game/sfx';

// Botón circular de 64 px. `label` es obligatorio: es lo que lee un lector de pantalla.
export default function IconButton({ icon, label, active, onClick, ...rest }) {
  return (
    <button type="button" className={`icon-btn ${active ? 'is-active' : ''}`} aria-label={label} title={label}
      onMouseEnter={() => sfx.hover()} onClick={(e) => { sfx.click(); onClick?.(e); }} {...rest}>
      <Icon name={icon} />
    </button>
  );
}
