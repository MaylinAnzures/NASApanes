// src/game/logica/engine.js  (JS puro: sin React ni Phaser)
import { MISSIONS } from '../data/missions';
import { buildReport } from '../data/dailyMessages';

const METRICS = ['electricidad', 'agua', 'comida', 'salud', 'oxigeno'];
export const LAST_DAY = 14;

// Gasto BASE de un día. Cada día se mueve al azar ±30 %, y a veces hay un pequeño imprevisto.
// En 14 días el gasto normal es: agua ≈ 63 de 140 L, comida ≈ 14 de 28 kg, oxígeno ≈ 27 de 42 kg, energía ≈ 50 de 100 %.
// Así queda margen para las decisiones difíciles, sin que el nivel sea imposible.
export const DAILY_BASE = { electricidad: 2.8, agua: 4.5, comida: 1.0, oxigeno: 1.7, salud: 0 };
const SPREAD = 0.3;          // variación diaria: de 70 % a 130 % del gasto base
const MISHAP_CHANCE = 0.2;   // 1 de cada 5 días hay un imprevisto pequeño
const r1 = (n) => Math.round(n * 10) / 10;

// Si uno de estos llega a 0, la misión se pierde (en este orden de prioridad).
export const LOSS_ORDER = ['oxigeno', 'salud', 'agua', 'comida', 'electricidad'];

export const createInitialState = (mission = MISSIONS.luna) => ({
  day: 1,
  mission: mission.id,
  equipment: [...mission.equipment],
  crew: mission.crew.map((c) => c.astroId).filter(Boolean),
  crewKeys: mission.crew.map((c) => c.key),
  seen: [], // escenarios ya ocurridos (para que no se repitan)
  resources: { ...mission.resources },
  lastReport: null,
});

const compare = (a, op, b) => (op === '<' ? a < b : op === '>' ? a > b : a === b);

function meetsTrigger(s, state) {
  const t = s.triggerConditions;
  const [min, max] = t.dayRange;
  if (state.day < min || state.day > max) return false;
  if (!t.requiredEquipment.every((e) => state.equipment.includes(e))) return false;

  const { logic, conditions } = t.resourceThresholds;
  if (conditions.length === 0) return true;
  const check = (c) => compare(state.resources[c.metric], c.operator, c.value);
  return logic === 'OR' ? conditions.some(check) : conditions.every(check);
}

function triggerChance(s, state) {
  const mod = s.probabilities.crewModifiers.find((m) => state.crew.includes(m.astronautId));
  return mod ? mod.finalTriggerChance : s.probabilities.baseTriggerChance;
}

export function pickScenario(state, scenarios, missionId = 'MISSION-1') {
  const eligible = scenarios.filter(
    (s) => s.missionId === missionId && !state.seen.includes(s.scenarioId) && meetsTrigger(s, state)
  );
  return eligible.find((s) => Math.random() < triggerChance(s, state)) ?? null;
}

export const getChoices = (s) =>
  Object.keys(s.gameplayMechanics)
    .filter((k) => k.startsWith('playerChoice'))
    .map((k) => ({ key: k, ...s.gameplayMechanics[k] }));

const clamp = (m, v) => (m === 'electricidad' || m === 'salud' ? Math.min(100, v) : v);

// Aplica efectos de una decisión. NO avanza el día.
export function applyChoice(state, choice, scenario) {
  const resources = { ...state.resources };
  METRICS.forEach((m) => {
    resources[m] = clamp(m, Math.max(0, +(resources[m] + (choice.effects[m] ?? 0)).toFixed(1)));
  });
  const seen = scenario ? [...state.seen, scenario.scenarioId] : state.seen;
  return { ...state, resources, seen };
}

// Pasa al día siguiente: la tripulación gasta sus reservas del día (con un poco de azar).
// Guarda en `lastReport` el resumen que explica por qué bajó cada recurso.
export function advanceDay(state, mission = MISSIONS[state.mission] ?? MISSIONS.luna, rng = Math.random) {
  const keys = state.crewKeys ?? [];
  const use = { salud: 0 };
  ['electricidad', 'agua', 'comida', 'oxigeno'].forEach((m) => {
    use[m] = r1(DAILY_BASE[m] * (1 - SPREAD + rng() * 2 * SPREAD));
  });

  const crewBonus = {};
  if (keys.includes('fisico')) { crewBonus.oxigeno = r1(use.oxigeno * 0.15); use.oxigeno = r1(use.oxigeno + crewBonus.oxigeno); }
  if (keys.includes('telecom')) { crewBonus.electricidad = 0.8; use.electricidad = r1(use.electricidad + 0.8); }
  if (keys.includes('astrobiologo') && rng() < 0.35) use.salud = 1;

  let mishap = null;
  if (rng() < MISHAP_CHANCE) {
    const metric = rng() < 0.5 ? 'electricidad' : 'agua';
    const amount = metric === 'electricidad' ? r1(1.5 + rng()) : r1(2 + 2 * rng());
    use[metric] = r1(use[metric] + amount);
    mishap = { metric, amount };
  }

  const resources = { ...state.resources };
  METRICS.forEach((m) => { resources[m] = Math.max(0, r1(resources[m] - (use[m] ?? 0))); });

  const max = Object.fromEntries(Object.entries(mission.resources));
  const report = buildReport({ use, crewBonus, mishap, resources, max, rolls: [rng(), rng(), rng(), rng()] });
  return { ...state, resources, day: state.day + 1, lastReport: { day: state.day, ...report } };
}

/**
 * Estado de la misión:
 *  null                              → sigue el juego
 *  { won: true }                     → sobrevivió los 14 días
 *  { won: false, reason: 'agua' }    → perdió; `reason` es el recurso que llegó a 0
 * Perder tiene prioridad: si en el último día algo llega a 0, no se gana.
 */
export function getOutcome(state) {
  const empty = LOSS_ORDER.find((m) => state.resources[m] <= 0);
  if (empty) return { won: false, reason: empty };
  if (state.day > LAST_DAY) return { won: true };
  return null;
}
export const isGameOver = (state) => getOutcome(state) !== null;

// Último día que se alcanzó a jugar (para "Llegaste al día X").
export const lastPlayedDay = (state) => Math.max(1, Math.min(state.day - (isGameOver(state) ? 1 : 0), LAST_DAY));
