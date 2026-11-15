import './Screens.css';
import OptionList from '../componentes/OptionList';
import { useMuted } from '../../hooks/useMuted';

export default function PauseMenu({ onResume, onExit }) {
  const [muted, toggleMute] = useMuted();
  return (
    <div className="scrim" onKeyDown={(e) => e.key === 'Escape' && onResume()}>
      <div className="pause ui-fade">
        <h2>Pausa</h2>
        <OptionList label="Menú de pausa" items={[
          { id: 'resume', icon: 'play', label: 'Reanudar', onSelect: onResume },
          { id: 'sound', icon: muted ? 'soundOff' : 'sound', label: 'Sonido', value: muted ? 'No' : 'Sí', onSelect: toggleMute },
          { id: 'exit', icon: 'back', label: 'Salir al menú', onSelect: onExit },
        ]} />
      </div>
    </div>
  );
}
