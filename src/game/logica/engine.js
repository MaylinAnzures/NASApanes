// src/game/logica/engine.js  (JS puro: sin React ni Phaser)
const METRICS = ['electricidad', 'agua', 'comida', 'salud', 'oxigeno'];
export const LAST_DAY = 14;

export const createInitialState = () => ({
  day: 1,
  equipment: ['IROSA_SOLAR', 'VEGGIE_GARDEN', 'HDPE_SHIELDING'],
  crew: ['ASTRO-05'],
  seen: [], // escenarios ya ocurridos (para que no se repitan)
  resources: { electricidad: 100, agua: 100, comida: 20, salud: 100, oxigeno: 40 },
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

export const advanceDay = (state) => ({ ...state, day: state.day + 1 });
export const isGameOver = (state) =>
  state.day > LAST_DAY || state.resources.salud <= 0 || state.resources.oxigeno <= 0;
