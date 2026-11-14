import Phaser from 'phaser';
import { GAME_EVENTS } from '../bridge/gameEvents';
import { NASA_GAME_SCENARIOS } from '../game/data/nasaGameData';

export function createMainScene(eventBus) {
  return class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene');
      this.eventBus = eventBus;
      this.score = 0;
      this.health = 100;
      this.player = null;
      this.scenarios = NASA_GAME_SCENARIOS.scenarios;
      this.handlePlayerMove = this.handlePlayerMove.bind(this);
      this.handlePlayerAttack = this.handlePlayerAttack.bind(this);
    }

    create() {
      this.add.text(32, 28, 'Escena Phaser', {
        color: '#93c5fd',
        fontFamily: 'Arial',
        fontSize: '24px'
      });

      this.player = this.add.circle(480, 270, 28, 0x38bdf8);
      this.add.text(32, 490, 'Usa los controles de React para mover y atacar', {
        color: '#94a3b8',
        fontFamily: 'Arial',
        fontSize: '16px'
      });

      this.eventBus.on(GAME_EVENTS.PLAYER_MOVE, this.handlePlayerMove);
      this.eventBus.on(GAME_EVENTS.PLAYER_ATTACK, this.handlePlayerAttack);
      this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.removeListeners, this);

      this.emitState();
    }

    handlePlayerMove(direction) {
      const distance = 24;
      const delta = direction === 'left' ? -distance : distance;
      this.player.x = Phaser.Math.Clamp(this.player.x + delta, 40, 920);
    }

    handlePlayerAttack() {
      this.score += 10;
      this.emitState();
    }

    emitState() {
      this.eventBus.emit(GAME_EVENTS.SCORE_CHANGED, this.score);
      this.eventBus.emit(GAME_EVENTS.PLAYER_HEALTH_CHANGED, this.health);
    }

    removeListeners() {
      this.eventBus.off(GAME_EVENTS.PLAYER_MOVE, this.handlePlayerMove);
      this.eventBus.off(GAME_EVENTS.PLAYER_ATTACK, this.handlePlayerAttack);
    }
  };
}
