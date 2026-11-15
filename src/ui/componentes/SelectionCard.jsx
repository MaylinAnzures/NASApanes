import './Cards.css';
import Icon from './Icon';
import Chip from './Chip';
import { sfx } from '../../game/sfx';

/**
 * Tarjeta de selección.
 * Sin elegir: violeta · Elegida: menta clara con borde, palomita y sombra profunda ·
 * No disponible: atenuada, con la razón escrita (disabledReason).
 */
export default function SelectionCard({ icon, title, description, chips = [], selected, disabled, disabledReason, onSelect, autoFocus }) {
  return (
    <button type="button" role="radio" aria-checked={!!selected} aria-disabled={disabled || undefined}
      disabled={disabled} autoFocus={autoFocus}
      className={`scard ${selected ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}`}
      onMouseEnter={() => !disabled && sfx.hover()}
      onClick={() => { sfx.select(); onSelect?.(); }}>
      {selected && <span className="scard__check"><Icon name="check" /></span>}
      {icon && <Icon name={icon} className="scard__icon" />}
      <strong className="scard__title">{title}</strong>
      <span className="scard__desc">{disabled && disabledReason ? disabledReason : description}</span>
      {chips.length > 0 && (
        <span className="scard__chips">
          {chips.map((c, i) => <Chip key={i} tone={selected ? 'light' : 'dark'}>{c}</Chip>)}
        </span>
      )}
    </button>
  );
}
