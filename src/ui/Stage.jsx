import { useRef } from 'react';
import GameCanvas from './GameCanvas';
import { eventBus } from '../bridge/eventBus';
import { GAME_EVENTS } from '../bridge/gameEvents';

// Caja 16:9. Phaser dibuja debajo; la UI de React va encima en .ui (se mide en --u).
export default function Stage({ children }) {
  const ref = useRef(null);
  const norm = (e) => {
    const r = ref.current.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };
  return (
    <div className="stage-wrap">
      <div ref={ref} className="stage"
        onPointerMove={(e) => eventBus.emit(GAME_EVENTS.POINTER_MOVED, norm(e))}
        onPointerDown={(e) => eventBus.emit(GAME_EVENTS.POINTER_DOWN, norm(e))}>
        <GameCanvas />
        <div className="ui">{children}</div>
      </div>
    </div>
  );
}
