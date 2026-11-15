import Phaser from 'phaser';

export function createEventBus() {
  return new Phaser.Events.EventEmitter();
}

// Instancia ÚNICA compartida por React y Phaser
export const eventBus = createEventBus();
