// Sonidos sintetizados con WebAudio: no necesitan archivos .mp3
let ctx = null;
let muted = false;
const listeners = new Set();

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function beep(freq, dur = 0.08, type = 'square', vol = 0.04, slide = 0, delay = 0) {
  if (muted) return;
  const c = audio();
  if (!c) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur);
}

export const sfx = {
  hover: () => beep(520, 0.04, 'triangle', 0.02),
  click: () => beep(440, 0.09, 'square', 0.04, 260),
  type: () => beep(880 + Math.random() * 240, 0.02, 'square', 0.01),
  select: () => { beep(600, 0.06, 'triangle', 0.05); beep(900, 0.08, 'triangle', 0.05, 0, 0.06); },
  good: () => { beep(523, 0.08, 'square', 0.04); beep(659, 0.08, 'square', 0.04, 0, 0.08); beep(784, 0.14, 'square', 0.04, 0, 0.16); },
  bad: () => { beep(300, 0.16, 'sawtooth', 0.05, -160); beep(180, 0.22, 'sawtooth', 0.05, -80, 0.14); },
  day: () => { beep(330, 0.1, 'triangle', 0.05); beep(494, 0.1, 'triangle', 0.05, 0, 0.1); beep(659, 0.2, 'triangle', 0.05, 0, 0.2); },
  isMuted: () => muted,
  setMuted(v) { muted = v; listeners.forEach((l) => l(v)); },
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
};
