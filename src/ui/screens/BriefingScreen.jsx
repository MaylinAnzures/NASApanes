import { useEffect, useState } from 'react';
import './MissionScreens.css';
import Button from '../componentes/Button';
import IconButton from '../componentes/IconButton';
import Chip from '../componentes/Chip';
import Tabs from '../componentes/Tabs';
import MissionFrame from '../componentes/MissionFrame';
import { sfx } from '../../game/sfx';

const BASE = import.meta.env.BASE_URL;
const TABS = [{ id: 'items', label: 'Objetos' }, { id: 'crew', label: 'Tripulación' }];

// Antes de despegar: Tripulación (ref. 1), Objetos/inventario (ref. 4) e Información de la misión (ref. 3).
export default function BriefingScreen({ mission, onStart, onBack }) {
  const [view, setView] = useState('crew'); // 'crew' | 'items' | 'info'
  const [itemId, setItemId] = useState('huerto');
  const item = mission.items.find((i) => i.id === itemId);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onBack(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack]);

  return (
    <div className="brief ui-fade">
      <div className="brief__back"><IconButton icon="back" label="Cambiar de misión" onClick={onBack} /></div>
      <MissionFrame className="brief__panel" aria-label={mission.name}>
        {view === 'info' ? (
          <div className="minfo">
            <div className="minfo__planet"><img src={`${BASE}assets/planetas/${mission.planet}.png`} alt={mission.destino} /></div>
            <h1 className="mtitle minfo__title">{mission.name}</h1>
            <p className="minfo__goal"><b>¡Tu objetivo!</b> {mission.objetivo}</p>
            <img className="minfo__capsule" src={`${BASE}assets/mision/capsula.png`} alt={mission.capsula} />
            <div className="minfo__facts">
              <div className="minfo__row"><Chip>{mission.dias} Días</Chip><Chip>{mission.dificultad}</Chip></div>
              <p className="minfo__cap">{mission.capsula}</p>
              <div className="minfo__row"><Chip>{mission.tripulantes} Tripulantes</Chip><Chip>{mission.costo}</Chip></div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="mtitle brief__title">{mission.name}</h1>
            <div className="brief__tabs"><Tabs tabs={TABS} value={view} onChange={setView} label="Objetos o tripulación" /></div>

            {view === 'crew' && (
              <div className="crew">
                {mission.crew.map((c) => (
                  <article key={c.key} className="ccard">
                    <h2>{c.title}</h2>
                    <p>{c.text}</p>
                  </article>
                ))}
              </div>
            )}

            {view === 'items' && (
              <div className="inv">
                <div className="inv__grid" role="listbox" aria-label="Objetos">
                  {mission.items.map((it) => (
                    <button key={it.id} type="button" role="option" aria-selected={it.id === itemId}
                      className={`tile ${it.id === itemId ? 'is-on' : ''}`}
                      onMouseEnter={() => sfx.hover()} onClick={() => { sfx.select(); setItemId(it.id); }}>
                      <img src={it.icon} alt="" />
                      <span>{it.qty}</span>
                    </button>
                  ))}
                </div>
                <aside className="idetail" aria-live="polite">
                  <div className="idetail__head">
                    <span className="idetail__icon"><img src={item.icon} alt="" /></span>
                    <div>
                      <h2>{item.title}</h2>
                      <p className="idetail__sub">{item.sub}</p>
                    </div>
                  </div>
                  <p className="idetail__desc">{item.desc}</p>
                  <div className="idetail__chips">
                    {(item.chips ?? [`Tienes: ${item.qty}`]).map((c) => <Chip key={c}>{c}</Chip>)}
                  </div>
                </aside>
              </div>
            )}
          </>
        )}

        <div className="brief__actions">
          {view === 'info'
            ? <Button onClick={() => setView('items')}>Inventario</Button>
            : <Button icon="info" onClick={() => setView('info')}>Información</Button>}
          <Button focused icon="play" autoFocus onClick={onStart}>¡Empezar Misión!</Button>
        </div>
      </MissionFrame>
    </div>
  );
}
