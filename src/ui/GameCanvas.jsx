import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { createGameConfig } from '../game/gameConfig';
import { eventBus } from '../bridge/eventBus';

export default function GameCanvas() {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return undefined;
    gameRef.current = new Phaser.Game(createGameConfig({ parent: containerRef.current, eventBus }));
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="stage__canvas" />;
}
