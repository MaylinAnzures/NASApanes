import { useEffect, useState } from 'react';

// Pantalla completa del navegador (también con la tecla F). En un monitor 16:9 el juego llena todo.
export function useFullscreen() {
  const [full, setFull] = useState(!!document.fullscreenElement);
  useEffect(() => {
    const on = () => setFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  const toggle = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  };
  useEffect(() => {
    const onKey = (e) => { if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey) toggle(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return [full, toggle];
}
