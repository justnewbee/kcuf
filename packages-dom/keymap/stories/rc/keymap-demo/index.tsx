import {
  ReactElement,
  useState,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  P
} from '@kcuf/demo-rc';

import keymap from '../../../src';

interface IProps {
  keystroke: string;
  onFire?(): void;
}

const ScFired = styled.strong`
  margin-left: 4px;
`;

function splitKeystroke(keystroke: string): string[] {
  if (keystroke.length <= 1 || !/\s/.test(keystroke)) {
    return [keystroke];
  }
  
  return keystroke.split(/\s+/);
}

export default function KeymapDemo({
  keystroke,
  onFire
}: IProps): ReactElement {
  const [stateFired, setStateFired] = useState(0);
  
  useEffect(() => keymap(keystroke, () => {
    setStateFired(Date.now());
    
    onFire?.();
  }), [keystroke, onFire]);
  
  return <P>
    {splitKeystroke(keystroke).map((v, i) => <kbd key={`${v}-${i}`}>{v === ' ' ? ' ' : v}</kbd>)}
    {stateFired > 0 ? <ScFired>Fired: <code>{stateFired}</code></ScFired> : null}
  </P>;
}