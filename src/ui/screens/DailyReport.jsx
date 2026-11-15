import './MissionScreens.css';
import Button from '../componentes/Button';
import Icon, { METRIC_ICON } from '../componentes/Icon';

// Resumen que sale al pasar cada día. Cada alerta: título corto, una oración simple y píldoras con las cifras exactas.
export default function DailyReport({ report, onContinue }) {
  return (
    <div className="report" role="dialog" aria-labelledby="rep-title">
      <div className="report__panel ui-fade">
        <h2 id="rep-title" className="report__title">Resumen del día {report.day}</h2>
        <ul className="report__grid">
          {report.items.map((it, i) => (
            <li key={i} className={`alert alert--${it.key}`}>
              <Icon name={it.icon ?? METRIC_ICON[it.key]} className="alert__icon" />
              <div className="alert__body">
                <strong className="alert__title">{it.title}</strong>
                <p className="alert__text">{it.text}</p>
                <div className="alert__pills">
                  {it.pills.map((p) => <span key={p.label} className="pill">{p.label}</span>)}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="report__tip"><b>Consejo:</b> {report.tip}</p>
        <Button autoFocus icon="check" onClick={onContinue}>Entendido</Button>
      </div>
    </div>
  );
}
