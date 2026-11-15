// Alertas del resumen diario, para niños de 7 a 12 años. Sin emojis.
// Cada alerta tiene 2 niveles: título corto (causante) + una oración simple, y las cifras van en píldoras.
const UNIT = { agua: ' L', electricidad: '%', comida: ' kg', oxigeno: ' kg', salud: '%' };
const LABEL = { agua: 'Agua', electricidad: 'Energía', comida: 'Comida', oxigeno: 'Oxígeno', salud: 'Salud' };
const num = (n) => String(Math.round(n * 10) / 10).replace('.', ',');
const pill = (k, n, label = LABEL[k]) => ({ key: k, label: `${label}: -${num(n)}${UNIT[k]}` });
const pick = (arr, r) => arr[Math.floor(r * arr.length) % arr.length];

const BASE = {
  agua: { title: 'Agua para la tripulación', text: [
    'Los astronautas bebieron, cocinaron y limpiaron los trajes espaciales.',
    'La tripulación usó agua para beber y para lavar el equipo.',
  ] },
  electricidad: { title: 'Luces y máquinas encendidas', text: [
    'Las luces y los sistemas de aire trabajaron todo el día.',
    'La calefacción y las computadoras gastaron energía de las baterías.',
  ] },
  oxigeno: { title: 'Aire para respirar', text: [
    'Todos los astronautas respiraron durante el día.',
    'Mientras más trabajan los astronautas, más aire necesitan.',
  ] },
  comida: { title: 'Hora de comer', text: [
    'Los astronautas comieron para tener fuerzas y seguir investigando.',
    'Entre el desayuno y la cena se fue parte de la comida.',
  ] },
};

const TIP = {
  agua: 'Queda poca agua. Elige opciones que la ahorren.',
  electricidad: 'Queda poca energía. Sin ella no hay luz ni calor.',
  oxigeno: 'Queda poco oxígeno. Elige opciones que lo cuiden.',
  comida: 'Queda poca comida. Cuida el mini-huerto.',
  salud: 'La tripulación está cansada. Protege su salud.',
};

/** @returns {{ items: {key:string, title:string, text:string, pills:{key:string,label:string}[]}[], tip: string }} */
export function buildReport({ use, crewBonus, mishap, resources, max, rolls }) {
  const items = [];
  const mis = (k) => (mishap?.metric === k ? mishap.amount : 0);

  ['agua', 'electricidad', 'oxigeno', 'comida'].forEach((k, i) => {
    const total = use[k] - mis(k);
    if (total <= 0) return;
    const pills = [pill(k, total)];
    let text = pick(BASE[k].text, rolls[i]);
    if (k === 'oxigeno' && crewBonus.oxigeno) {
      text = 'Todos respiraron, y el Físico de Radiación gastó un poco más.';
      pills.push(pill(k, crewBonus.oxigeno, 'Incluye Físico'));
    }
    if (k === 'electricidad' && crewBonus.electricidad) {
      text = 'Las luces y máquinas trabajaron todo el día, y Telecom usó energía extra.';
      pills.push(pill(k, crewBonus.electricidad, 'Incluye Telecom'));
    }
    items.push({ key: k, title: BASE[k].title, text, pills });
  });

  if (mishap) {
    items.push({ key: mishap.metric, icon: 'info', title: 'Pequeño imprevisto',
      text: 'Un equipo de la base se desgastó un poquito por el uso diario.', pills: [pill(mishap.metric, mishap.amount)] });
  }
  if (use.salud > 0) {
    items.push({ key: 'salud', title: 'Astrobiólogo cansado',
      text: 'Trabajó mucho recogiendo datos y necesita descansar.', pills: [pill('salud', use.salud)] });
  }

  const ratios = Object.keys(max).map((k) => [k, resources[k] / max[k]]).sort((a, b) => a[1] - b[1]);
  const [lowK, lowR] = ratios[0];
  const tip = lowR < 0.3 ? TIP[lowK] : lowR >= 0.5 ? 'Vas muy bien, comandante. Tus reservas están en buen estado.' : 'Algunas reservas ya van a la mitad. Piensa bien tu próxima decisión.';
  return { items, tip };
}
