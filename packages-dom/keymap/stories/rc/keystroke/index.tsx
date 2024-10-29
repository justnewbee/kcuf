import {
  ReactElement,
  useState,
  useCallback,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  Kbd,
  Code
} from '@kcuf/demo-rc';

import keymap from '../../../src';

interface IProps {
  keystroke: string;
  returnFalse?: boolean;
  onFire?(): void;
}

const ScFired = styled(Code)`
  margin-left: 4px;
`;

function splitKeystroke(keystroke: string): string[] {
  if (keystroke.length <= 1 || !/\s/.test(keystroke)) {
    return [keystroke];
  }
  
  return keystroke.split(/\s+/);
}

const ScKeymapDemo = styled.div`
  padding: 4px;
`;

export default function Keystroke({
  keystroke,
  returnFalse,
  onFire
}: IProps): ReactElement {
  const [stateFired, setStateFired] = useState(0);
  const [stateClearFiredTimer, setStateClearFiredTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  
  const handleFire = useCallback(() => {
    setStateFired(Date.now() % 10000);
    
    onFire?.();
    
    setStateClearFiredTimer(value => {
      if (value) {
        clearTimeout(value);
      }
      
      return setTimeout(() => {
        setStateFired(0);
      }, 1000);
    });
    
    if (returnFalse) {
      return false;
    }
  }, [returnFalse, onFire, setStateFired]);
  
  useEffect(() => keymap(keystroke, handleFire), [keystroke, handleFire]);
  
  useEffect(() => {
    return () => {
      if (stateClearFiredTimer) {
        clearTimeout(stateClearFiredTimer);
      }
    };
  }, [stateClearFiredTimer]);
  
  return <ScKeymapDemo>
    {splitKeystroke(keystroke).map((v, i) => <Kbd key={`${v}-${i}`}>{v === ' ' ? '空' : v}</Kbd>)}
    {stateFired > 0 ? <ScFired>{stateFired}</ScFired> : null}
  </ScKeymapDemo>;
}