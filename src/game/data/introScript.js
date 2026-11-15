// Guion de la introducción. `stage` decide qué fondo dibuja Phaser.
// variant 'panel'  → sala de control (stage 'intro'), panel de rejilla + Continuar.
// variant 'bubble' → ventana de la nave (stage 'window'), globo de cómic.
export const INTRO_SCRIPT = [
  {
    stage: 'intro',
    variant: 'panel',
    text: '¡Estamos en el año **2067**! La Tierra necesita ayuda. Para cuidar nuestro futuro, las personas van a construir bases en Marte y en la Luna.',
  },
  {
    stage: 'intro',
    variant: 'panel',
    text: '¡Te eligieron como **Comandante** de esta misión! Tu trabajo es cuidar a tu equipo de científicos y astronautas, y hacer que todo funcione bien en un lugar nuevo.',
  },
  {
    stage: 'intro',
    variant: 'panel',
    text: 'En el espacio no hay tiendas y nadie te trae comida a casa. La energía, el agua, la comida y el aire son muy valiosos. ¡Piensa bien cada decisión!',
  },
  {
    stage: 'intro',
    variant: 'panel',
    text: '¡Cuidado! Vas a un lugar salvaje, con tormentas gigantes de polvo y sorpresas del espacio.\n**¡La misión depende de ti! ¿Estás listo para despegar?**',
  },
  {
    stage: 'window',
    variant: 'bubble',
    text: 'Desde el espacio, la Tierra se ve como una bolita azul, pequeña y delicada…',
  },
  {
    stage: 'window',
    variant: 'bubble',
    text: 'Hace muchos años, nuestros sensores avisaron que a la Tierra se le estaban acabando los recursos y que el clima cambiaba muy rápido.',
  },
  {
    stage: 'window',
    variant: 'bubble',
    text: 'No vamos al espacio para dejar la Tierra. Vamos para aprender a cuidarla.',
  },
];
