import './Cards.css';

// Panel rectangular con rejilla verde (diálogos, "Saltar"). Esquina superior izquierda muy redonda.
export function GridPanel({ children, className = '', round = false, ...rest }) {
  return <div className={`panel-grid ${round ? 'panel-grid--round' : ''} ${className}`} {...rest}>{children}</div>;
}

// Panel trapezoidal del menú principal. tone: 'grid' (oscuro) | 'light' (menta clara)
export function TrapezoidPanel({ children, tone = 'grid', className = '' }) {
  const d = 'M70 24 H690 Q735 24 742 66 L706 320 Q688 440 570 462 H190 Q72 440 54 320 L18 66 Q25 24 70 24 Z';
  const id = `trap-${tone}`;
  return (
    <div className={`trap trap--${tone} ${className}`}>
      <svg className="trap__bg" viewBox="0 0 760 486" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id={id} width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="rgba(111,212,154,.16)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <path d={d} fill={tone === 'grid' ? '#334b3d' : '#c9f5d9'} stroke={tone === 'grid' ? '#2c1747' : '#4a0d6b'} strokeWidth="30" strokeLinejoin="round" />
        {tone === 'grid' && <path d={d} fill={`url(#${id})`} />}
      </svg>
      <div className="trap__body">{children}</div>
    </div>
  );
}
