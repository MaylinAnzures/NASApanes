import { GameCanvas } from './ui/GameCanvas';

export default function App() {
  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">React + Phaser 3</p>
          <h1>NasaPhaser</h1>
        </div>
        <p className="status">Bridge activo</p>
      </header>
      <GameCanvas />
    </main>
  );
}
