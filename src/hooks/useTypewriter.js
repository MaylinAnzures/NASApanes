import { useCallback, useEffect, useState } from 'react';
import { sfx } from '../game/sfx';

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Escribe el texto letra por letra, como en un videojuego.
export function useTypewriter(text, speed = 26) {
  const [n, setN] = useState(() => (reduced() ? text.length : 0));

  useEffect(() => {
    if (reduced()) { setN(text.length); return undefined; }
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i % 3 === 0) sfx.type();
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  const skip = useCallback(() => setN(text.length), [text]);
  return { shown: text.slice(0, n), done: n >= text.length, skip };
}
