import Phaser from 'phaser';

export function createEventBus() {
  return new Phaser.Events.EventEmitter();
}
