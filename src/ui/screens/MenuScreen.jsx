import Button from '../componentes/Button';

export default function MenuScreen({ onPlay }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: 80 }}>
      <h1>Proyecto: Ares 4</h1>
      <Button onClick={onPlay}>Jugar</Button>
    </div>
  );
}