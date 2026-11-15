import Phaser from 'phaser';
import { GAME_EVENTS } from '../bridge/gameEvents';

export function createMainScene(eventBus) {
  return class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene');
    }

    create() {
      this.label = this.add
        .text(480, 270, 'Cápsula', { color: '#7dffa8', fontSize: '28px' })
        .setOrigin(0.5);

      this.onResources = (res) => {
        this.label.setText(
          `Electricidad: ${res.electricidad}%\nAgua: ${res.agua} L\nComida: ${res.comida} kg\n` +
          `Salud: ${res.salud}%\nOxígeno: ${res.oxigeno} kg`
        );
      };
      eventBus.on(GAME_EVENTS.RESOURCES_CHANGED, this.onResources);

      const cleanup = () => eventBus.off(GAME_EVENTS.RESOURCES_CHANGED, this.onResources);
      this.events.once('shutdown', cleanup);
      this.events.once('destroy', cleanup);

      // Avisa a React que ya puede mandarle el estado inicial
      eventBus.emit(GAME_EVENTS.SCENE_READY);
    }
  };
}
