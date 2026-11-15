import { useEffect } from 'react';
import './Dialogue.css';
import Button from './Button';
import { GridPanel } from './Panel';
import { useTypewriter } from '../../hooks/useTypewriter';

// "**negrita**" -> <b>; tolera un ** sin cerrar mientras se escribe
function rich(str) {
  return str.replace(/\*$/, '').split('**').map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p));
}

/**
 * Diálogo con efecto de máquina de escribir.
 * variant 'panel'  → panel de rejilla con botón Continuar (referencia 2).
 * variant 'bubble' → globo de cómic; se avanza tocando el globo (referencia 3).
 * position 'right' | 'center'.  Si hay onSkip aparece "Saltar" abajo a la derecha.
 */
export default function DialogueScreen({
  variant = 'panel', position = 'right', text, onContinue, onSkip, continueLabel = 'Continuar',
}) {
  const { shown, done, skip } = useTypewriter(text);
  const plain = text.replace(/\*\*/g, '');
  const advance = () => (done ? onContinue?.() : skip());

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && onSkip) onSkip();
      if ((e.key === ' ' || e.key === 'Enter') && !(e.target instanceof HTMLButtonElement)) {
        e.preventDefault(); advance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const body = (
    <span className="dlg__stack">
      <span className="dlg__ghost" aria-hidden="true">{plain}</span>
      <span className="dlg__live" aria-hidden="true">{rich(shown)}</span>
      <span className="sr-only">{plain}</span>
    </span>
  );

  return (
    <div className={`dlg dlg--${variant} dlg--${position} ui-fade`}>
      {variant === 'panel' ? (
        <GridPanel className="dlg__panel">
          <p className="dlg__text">{body}</p>
          <Button key={text} variant="primary" icon="play" autoFocus onClick={advance}>
            {done ? continueLabel : '. . .'}
          </Button>
        </GridPanel>
      ) : (
        <button type="button" className="bubble" onClick={() => { advance(); }} aria-label="Avanzar diálogo">
          <svg className="bubble__shape" viewBox="0 0 740 340" preserveAspectRatio="none" aria-hidden="true">
            <path d="M70 18 C250 -2 560 10 690 30 C735 40 742 92 720 160 C706 218 700 250 660 262 C520 296 330 296 190 286 L22 330 L66 252 C26 232 18 150 30 90 C36 46 40 26 70 18 Z"
              fill="var(--bubble)" stroke="var(--bubble-edge)" strokeWidth="14" strokeLinejoin="round" />
          </svg>
          <span className="bubble__text">{body}</span>
          {done && <span className="bubble__next" aria-hidden="true" />}
        </button>
      )}
      {onSkip && (
        <button type="button" className="skip" onClick={onSkip}>Saltar</button>
      )}
    </div>
  );
}
