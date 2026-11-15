import { useState } from 'react';
import Button from '../componentes/Button';
import IconButton from '../componentes/IconButton';
import BackNext from '../componentes/BackNext';
import Tabs from '../componentes/Tabs';
import OptionList from '../componentes/OptionList';
import SelectionCard from '../componentes/SelectionCard';
import { TrapezoidPanel } from '../componentes/Panel';
import './UiKit.css';

// Hoja de componentes (abrir con  /?ui ). Réplica de "Botones y paneles".
export default function UiKit() {
  const [tab, setTab] = useState('agua');
  const [card, setCard] = useState('bolsas');
  return (
    <main className="kit">
      <p className="kit__crumb">Proyecto: Ares 4 / Botones y paneles de menú</p>
      <h1>Botones y paneles</h1>

      <h2>1. Menú principal</h2>
      <div className="kit__row">
        <div className="kit__box kit__box--menu">
          <TrapezoidPanel tone="light">
            <h3 className="kit__ptitle">Proyecto: Ares 4</h3>
            <Button focused>Jugar</Button>
            <Button>Historia</Button>
          </TrapezoidPanel>
        </div>
        <div className="kit__box">
          <p className="kit__label">Estados del botón principal · 60 px de alto, 6 px de profundidad</p>
          <div className="kit__wrap">
            <Button silent>Normal</Button>
            <Button silent focused>Foco</Button>
            <Button silent pressed>Presionado</Button>
            <Button silent variant="danger" icon="x">Abortar</Button>
            <Button silent variant="light" icon="play">Continuar</Button>
            <Button silent disabled>Bloqueado</Button>
          </div>
          <p className="kit__note">El foco usa los corchetes y el degradado del referente; sirve igual con teclado, control o toque. Al presionar baja 4 px y suena un clic corto.</p>
        </div>
      </div>

      <h2>2. Navegación y controles</h2>
      <div className="kit__row">
        <div className="kit__box">
          <p className="kit__label">Botones de icono · 64 px</p>
          <div className="kit__wrap">
            <IconButton icon="back" label="Atrás" />
            <IconButton icon="pause" label="Pausa" />
            <IconButton icon="sound" label="Sonido" />
            <IconButton icon="sun" label="Brillo" />
            <IconButton icon="info" label="Información" active />
          </div>
          <p className="kit__label">Atrás / Siguiente</p>
          <BackNext />
          <p className="kit__label">Pestañas de categoría</p>
          <Tabs value={tab} onChange={setTab} tabs={[
            { id: 'agua', label: 'Agua' }, { id: 'aire', label: 'Aire' },
            { id: 'comida', label: 'Comida' }, { id: 'energia', label: 'Energía' },
          ]} />
        </div>
        <div className="kit__box">
          <p className="kit__label">Lista de opciones · 60 px por fila</p>
          <OptionList items={[
            { id: 's', icon: 'sound', label: 'Sonido', value: 'Sí' },
            { id: 'm', icon: 'music', label: 'Música' },
            { id: 'i', icon: 'globe', label: 'Idioma' },
            { id: 'c', icon: 'info', label: 'Créditos' },
          ]} />
        </div>
      </div>

      <h2>3. Tarjetas de selección (equipo de la misión)</h2>
      <div className="kit__cards" role="radiogroup">
        <SelectionCard icon="drop" title="Bolsas selladas" selected={card === 'bolsas'} onSelect={() => setCard('bolsas')}
          description="Agua lista para tomar. No gasta electricidad, pero pesa mucho." chips={['360 kg', '7.5 M USD', '0 W']} />
        <SelectionCard icon="leaf" title="Planta recicladora" selected={card === 'planta'} onSelect={() => setCard('planta')}
          description="Convierte sudor y vapor en agua limpia. Ocupa espacio y energía." chips={['650 kg', '85 M USD', '1,500 W']} />
        <SelectionCard icon="lock" title="Extractor de hielo" disabled
          disabledReason="Solo funciona al aterrizar. Esta nave no lo admite." chips={['420 kg', '110 M USD', '3,000 W']} />
      </div>
      <p className="kit__note">Sin elegir: violeta. Elegida: menta clara con borde, palomita y sombra más profunda. No disponible: atenuada y con la razón escrita.</p>
    </main>
  );
}
