import { useEffect, useMemo, useRef } from 'react';
import { createGame } from '../game/createGame';
import { createEventBus } from '../bridge/eventBus';

export function usePhaserGame() {
  const containerRef = useRef(null);
  const gameRef = useRef(null);
  const eventBus = useMemo(() => createEventBus(), []);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) {
      return undefined;
    }

    gameRef.current = createGame({
      parent: containerRef.current,
      eventBus
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      eventBus.removeAllListeners();
    };
  }, [eventBus]);

  return { containerRef, eventBus };
}
