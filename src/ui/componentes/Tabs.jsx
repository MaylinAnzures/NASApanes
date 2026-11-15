import './Controls.css';
import { sfx } from '../../game/sfx';

// Pestañas de categoría. Flechas izquierda/derecha cambian de pestaña.
export default function Tabs({ tabs, value, onChange, label = 'Categorías' }) {
  const i = tabs.findIndex((t) => t.id === value);
  const move = (d) => {
    const t = tabs[(i + d + tabs.length) % tabs.length];
    sfx.select(); onChange(t.id);
    requestAnimationFrame(() => document.getElementById(`tab-${t.id}`)?.focus());
  };
  return (
    <div className="tabs" role="tablist" aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
      }}>
      {tabs.map((t) => (
        <button key={t.id} id={`tab-${t.id}`} type="button" role="tab"
          aria-selected={t.id === value} tabIndex={t.id === value ? 0 : -1}
          className={`tabs__tab ${t.id === value ? 'is-on' : ''}`}
          onClick={() => { sfx.select(); onChange(t.id); }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
