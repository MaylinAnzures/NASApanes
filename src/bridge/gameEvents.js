export const GAME_EVENTS = Object.freeze({
  SCENE_READY: 'scene:ready',             // Phaser -> React
  RESOURCES_CHANGED: 'resources:changed', // React -> Phaser
  STAGE_CHANGED: 'stage:changed',         // React -> Phaser  ('menu' | 'intro' | 'window' | 'select' | 'briefing' | 'cabin')
  POINTER_MOVED: 'pointer:moved',         // React -> Phaser  ({x, y} normalizados 0..1)
  POINTER_DOWN: 'pointer:down',           // React -> Phaser  ({x, y} normalizados 0..1)
  DAY_ADVANCED: 'day:advanced',           // React -> Phaser
  SCENARIO_TRIGGERED: 'scenario:triggered',
  MISSION_CHANGED: 'mission:changed'      // React -> Phaser  ({ planet: 'luna' | 'marte', max: {...} })
});
