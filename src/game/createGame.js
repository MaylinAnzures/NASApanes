import Phaser from 'phaser';
import { createGameConfig } from './gameConfig';

export function createGame({ parent, eventBus }) {
  return new Phaser.Game(createGameConfig({ parent, eventBus }));
}
