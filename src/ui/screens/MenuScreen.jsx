import './Screens.css';
import Button from '../componentes/Button';
import IconButton from '../componentes/IconButton';
import { TrapezoidPanel } from '../componentes/Panel';
import { useMuted } from '../../hooks/useMuted';
import { useFullscreen } from '../../hooks/useFullscreen';

export default function MenuScreen({ onPlay }) {
  const [muted, toggleMute] = useMuted();
  const [full, toggleFull] = useFullscreen();
  return (
    <div className="menu ui-fade">
      <div className="menu__corner">
        <IconButton icon={full ? 'shrink' : 'expand'} label={full ? 'Salir de pantalla completa' : 'Pantalla completa'} onClick={toggleFull} />
        <IconButton icon={muted ? 'soundOff' : 'sound'} label={muted ? 'Activar sonido' : 'Silenciar'} onClick={toggleMute} />
      </div>
      <TrapezoidPanel tone="grid">
        <h1 className="menu__title">Misión Ares-IV</h1>
        <Button size="lg" icon="play" autoFocus onClick={onPlay}>JUGAR</Button>
      </TrapezoidPanel>
    </div>
  );
}
