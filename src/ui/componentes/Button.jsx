import './Button.css';
import Icon from './Icon';
import { sfx } from '../../game/sfx';

/**
 * Botón principal (60 px de alto, 6 px de profundidad; `size="lg"` = 73 px / 8 px para menú e historia).
 * variant: primary | danger | light | violet
 * Estados: normal, hover, foco (corchetes + degradado), presionado (baja 4 px), bloqueado.
 * `focused` / `pressed` fuerzan el estado (útil para la hoja de componentes).
 */
export default function Button({
  children, variant = 'primary', size = 'md', icon, disabled, onClick, autoFocus,
  focused, pressed, silent, className = '', type = 'button', ...rest
}) {
  return (
    <span className={`btn-wrap btn-wrap--${size} ${focused ? 'is-focus' : ''} ${className}`}>
      <button
        type={type}
        className={`btn btn--${variant} btn--${size} ${pressed ? 'is-pressed' : ''}`}
        disabled={disabled}
        autoFocus={autoFocus}
        onMouseEnter={() => !disabled && !silent && sfx.hover()}
        onClick={(e) => { if (!silent) sfx.click(); onClick?.(e); }}
        {...rest}
      >
        {icon && <Icon name={icon} className="btn__icon" />}
        <span>{children}</span>
      </button>
    </span>
  );
}
