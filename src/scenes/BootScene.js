import Phaser from 'phaser';

const BASE = `${import.meta.env.BASE_URL}assets/`;

export function createBootScene() {
  return class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    preload() {
      const bar = this.add.rectangle(800, 450, 4, 14, 0x72f0a0).setOrigin(0, 0.5);
      bar.x = 600;
      this.load.on('progress', (p) => { bar.width = 400 * p; });

      this.load.image('astroSaluda', `${BASE}personajes/robot.png`);        // astronauta saludando
      this.load.image('astroFrente', `${BASE}personajes/astronautaFrente.png`);
      this.load.image('astroEspal', `${BASE}personajes/astronautaEspal.png`);
      this.load.image('marte', `${BASE}planetas/marte.png`);
      this.load.image('luna', `${BASE}planetas/luna.png`);
    }

    async create() {
      // texturas generadas por código (estrellas y chispas)
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0xffffff, 1).fillCircle(8, 8, 8).generateTexture('star', 16, 16);
      g.clear().fillStyle(0xffffff, 1).fillRect(0, 0, 10, 10).generateTexture('spark', 10, 10);
      g.destroy();

      // espera a las tipografías para que Phaser mida bien el texto
      try { await Promise.all([document.fonts.load('700 20px "Space Mono"'), document.fonts.load('700 20px "Lexend"')]); } catch { /* sigue igual */ }
      this.scene.start('MainScene');
    }
  };
}
