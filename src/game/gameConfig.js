import Phaser from 'phaser';
import { createBootScene } from '../scenes/BootScene';
import { createMainScene } from '../scenes/MainScene';

// Lienzo de 1600×900 (16:9): mismas coordenadas que las pantallas de referencia.
export function createGameConfig({ parent, eventBus }) {
  return {
    type: Phaser.AUTO,
    parent,
    width: 1920,
    height: 1080,
    backgroundColor: '#231338',
    render: { antialias: true, pixelArt: false, roundPixels: false },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 1600, height: 900 },
    physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
    scene: [createBootScene(), createMainScene(eventBus)],
  };
}
