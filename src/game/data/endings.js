// Textos de final de misión, escritos para niños de 7 a 12 años.
export const WIN = {
  title: '¡Lo lograste!',
  text: 'La cápsula **Orion-X** volvió sana y salva a la Tierra. ¡Cuidaste muy bien a tu tripulación! Ya estás listo para liderar misiones aún más lejos en el espacio.',
};

// Un final por cada recurso que puede llegar a 0.
export const LOSS = {
  oxigeno: {
    title: '¡Se acabó el aire!',
    text: 'El **oxígeno** llegó a cero y la tripulación ya no pudo respirar.',
    tip: 'Consejo: cuando el aire esté bajo, elige las opciones que lo cuiden.',
  },
  salud: {
    title: '¡La tripulación se enfermó!',
    text: 'La **salud** del equipo llegó a cero. Los astronautas estaban demasiado cansados para seguir.',
    tip: 'Consejo: no elijas siempre las opciones que dañan la salud, aunque ahorren otras cosas.',
  },
  agua: {
    title: '¡Se acabó el agua!',
    text: 'Sin **agua** no se puede beber ni mantener las máquinas funcionando.',
    tip: 'Consejo: el agua se gasta todos los días. Cuídala desde el principio.',
  },
  comida: {
    title: '¡Se acabó la comida!',
    text: 'La **comida** llegó a cero y los astronautas se quedaron sin fuerzas.',
    tip: 'Consejo: el huerto ayuda mucho. Trata de no perder cosecha.',
  },
  electricidad: {
    title: '¡Se apagó la nave!',
    text: 'La **energía** llegó a cero y todas las máquinas se apagaron.',
    tip: 'Consejo: sin energía no hay luz, calor ni aire. Cuida las baterías.',
  },
};

export const STATS = [
  ['oxigeno', 'Oxígeno', ' kg'],
  ['agua', 'Agua', ' L'],
  ['comida', 'Comida', ' kg'],
  ['electricidad', 'Energía', '%'],
  ['salud', 'Salud', '%'],
];
