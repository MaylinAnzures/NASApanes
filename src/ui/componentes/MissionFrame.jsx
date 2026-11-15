import './MissionFrame.css';

// Marco verde con rejilla y esquinas de las pantallas de misión (selección, tripulación, objetos e información).
// corners: 'all' (4 esquinas) | 'top' (solo las de arriba; el marco sigue fuera de pantalla)
export default function MissionFrame({ children, className = '', corners = 'all', ...rest }) {
  const cs = corners === 'top' ? ['tl', 'tr'] : ['tl', 'tr', 'bl', 'br'];
  return (
    <section className={`mframe ${className}`} {...rest}>
      {cs.map((c) => <span key={c} className={`mframe__c mframe__c--${c}`} aria-hidden="true" />)}
      <div className="mframe__body">{children}</div>
    </section>
  );
}
