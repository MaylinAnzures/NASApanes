// Datos de las misiones que se pueden elegir. Los textos salen de las pantallas de referencia.
// Los íconos del inventario y la cápsula son recortes de esas pantallas (public/assets/inventario y /mision).

const BASE = import.meta.env.BASE_URL;
const inv = (n) => `${BASE}assets/inventario/${n}.png`;

// Tripulación (pantalla "Tripulación"). `astroId` conecta con los modificadores de probabilidad de nasaGameData.
export const CREW = [
  { key: 'fisico', astroId: 'ASTRO-05', title: 'Físico de Radiación', text: 'Protege del sol y avisa de peligros, pero gasta +15% de oxígeno.' },
  { key: 'telecom', astroId: 'ASTRO-12', title: 'Especialista en Telecom', text: 'Automatiza tareas y da +1.5 horas libres al día, pero gasta +450 W de luz.' },
  { key: 'astrobiologo', astroId: null, title: 'Astrobiólogo', text: 'Recoge más datos científicos, pero se cansa rápido.' },
];

// Objetos (pantalla "Objetos"): el inventario con el que empieza la misión.
export const ITEMS = [
  { id: 'solar', icon: inv('solar'), qty: 'x1', title: 'Paneles solares', sub: 'Luz del Sol convertida en energía',
    desc: 'Atrapan la luz del Sol y la convierten en electricidad para toda la nave. ¡Si la energía se acaba, todo se apaga!' },
  { id: 'agua', icon: inv('agua'), qty: '140 L', title: 'Tanque de agua', sub: 'Para beber y para las máquinas',
    desc: 'El agua sirve para beber, cocinar y limpiar. Se gasta todos los días, ¡así que cuídala desde el primer día!' },
  { id: 'oxigeno', icon: inv('oxigeno'), qty: '42 kg', title: 'Oxígeno', sub: 'El aire para respirar',
    desc: 'Es el aire que respira tu tripulación. Cada astronauta usa un poquito todos los días.' },
  { id: 'comida', icon: inv('comida'), qty: '28 kg', title: 'Comida espacial', sub: 'Fuerzas para los astronautas',
    desc: 'Alimentos empacados para toda la misión. Si cuidas el huerto, ¡te alcanza por más tiempo!' },
  { id: 'huerto', icon: inv('huerto'), qty: 'x1', title: 'Mini-huerto Veggie', sub: 'Cultivo espacial fresco',
    desc: 'Una pequeña cámara con luces especiales para cultivar verduras frescas. Mantiene feliz y saludable a tu tripulación.',
    chips: ['Energía: -140 W', 'Costo: $8 M USD', 'Peso: 35 kg'] },
  { id: 'filtros', icon: inv('filtros'), qty: 'x1', title: 'Filtros de aire', sub: 'Aire limpio en la cabina',
    desc: 'Limpian el aire de la cabina para que tu tripulación pueda respirar tranquila.' },
  { id: 'tripulacion', icon: inv('tripulacion'), qty: 'x3', title: 'Tu tripulación', sub: '¡Tu equipo de científicos!',
    desc: 'Tres astronautas con superpoderes distintos. ¡Entra a la pestaña Tripulación para conocerlos!' },
];

const OBJETIVO = 'Administra con inteligencia el agua, la comida, el oxígeno y la energía de la nave. Mantén a tu tripulación a salvo de la radiación solar y completa la investigación científica antes de que se acabe el tiempo y llegue la hora de volver a casa.';

// Reservas con las que empieza (coinciden con el inventario de la pantalla: 140 L, 42 kg, 28 kg).
export const START_RESOURCES = { electricidad: 100, agua: 140, comida: 28, salud: 100, oxigeno: 42 };

const common = {
  objetivo: OBJETIVO, dias: 14, dificultad: 'Fácil', capsula: 'Cápsula Orion-X', tripulantes: 3, costo: '$220 M USD',
  crew: CREW, items: ITEMS, resources: START_RESOURCES,
  equipment: ['IROSA_SOLAR', 'VEGGIE_GARDEN', 'HDPE_SHIELDING', 'LIOH_FILTERS', 'ISS_EMU_SUITS'],
};

export const MISSIONS = {
  luna: { id: 'luna', planet: 'luna', label: 'LUNA', name: 'Misión Metztli', destino: 'la Luna', ...common },
  marte: { id: 'marte', planet: 'marte', label: 'MARTE', name: 'Misión Ares-IV', destino: 'Marte', ...common },
};
export const MISSION_LIST = [MISSIONS.luna, MISSIONS.marte];
