import Phaser from 'phaser';
import { createMainScene } from '../scenes/MainScene';

export function createGameConfig({ parent, eventBus }) {
  return {
    type: Phaser.AUTO,
    parent,
    width: 960,
    height: 540,
    backgroundColor: '#111827',
    render: {
      antialias: false,
      pixelArt: true,
      roundPixels: true
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 960,
      height: 540
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [createMainScene(eventBus)]
  };
}
