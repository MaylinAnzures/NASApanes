import { useEffect, useState } from 'react';
import { sfx } from '../game/sfx';

export function useMuted() {
  const [muted, setMuted] = useState(sfx.isMuted());
  useEffect(() => sfx.subscribe(setMuted), []);
  return [muted, () => sfx.setMuted(!sfx.isMuted())];
}
