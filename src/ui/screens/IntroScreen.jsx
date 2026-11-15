import { useEffect, useState } from 'react';
import DialogueScreen from '../componentes/DialogueScreen';
import { INTRO_SCRIPT } from '../../game/data/introScript';

// Reproduce el guion de la intro. Avisa a App qué fondo (stage) pide cada línea.
export default function IntroScreen({ onStage, onDone }) {
  const [i, setI] = useState(0);
  const line = INTRO_SCRIPT[i];

  useEffect(() => { onStage(line.stage); }, [line.stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const next = () => (i + 1 < INTRO_SCRIPT.length ? setI(i + 1) : onDone());
  return <DialogueScreen key={i} variant={line.variant} text={line.text} onContinue={next} onSkip={onDone} />;
}
