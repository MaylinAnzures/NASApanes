import './Controls.css';
import Icon from './Icon';
import { sfx } from '../../game/sfx';

/**
 * Lista de opciones, 60 px por fila. items: [{ id, icon, label, value?, onSelect }]
 * Con `value` muestra el valor a la derecha (ej. "Sí"); sin él, una flecha.
 * Flechas arriba/abajo mueven el foco; la fila con foco usa corchetes y degradado.
 */
export default function OptionList({ items, label = 'Opciones' }) {
  const onKey = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const rows = [...e.currentTarget.querySelectorAll('.opt')];
    const i = rows.indexOf(document.activeElement);
    rows[(i + (e.key === 'ArrowDown' ? 1 : -1) + rows.length) % rows.length]?.focus();
  };
  return (
    <div className="optlist" role="menu" aria-label={label} onKeyDown={onKey}>
      {items.map((it) => (
        <div className="opt-wrap" key={it.id}>
          <button type="button" role="menuitem" className="opt"
            onMouseEnter={() => sfx.hover()}
            onClick={() => { sfx.click(); it.onSelect?.(); }}>
            <Icon name={it.icon} className="opt__icon" />
            <span className="opt__label">{it.label}</span>
            {it.value != null ? <span className="opt__value">{it.value}</span> : <Icon name="next" className="opt__chev" />}
          </button>
        </div>
      ))}
    </div>
  );
}
