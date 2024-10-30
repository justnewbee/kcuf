import {
  ReactElement,
  useState,
  useCallback,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  Kbd
} from '@kcuf/demo-rc';

import keymap from '../../../src';

interface IProps {
  keystroke: string;
  target?: HTMLElement;
  returnFalse?: boolean;
  caseSensitive?: boolean;
  onFire?(): void;
}

const ScFired = styled.strong`
  margin-left: 4px;
  color: hsl(0 89% 50%);
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
  target,
  returnFalse,
  caseSensitive,
  onFire
}: IProps): ReactElement {
  const [stateFired, setStateFired] = useState(0);
  const [stateFiredVisible, setStateFiredVisible] = useState(false);
  const [stateClearFiredTimer, setStateClearFiredTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  
  const handleFire = useCallback(() => {
    setStateFired(value => value + 1);
    setStateFiredVisible(true);
    
    onFire?.();
    
    setStateClearFiredTimer(value => {
      if (value) {
        clearTimeout(value);
      }
      
      return setTimeout(() => {
        setStateFiredVisible(false);
      }, 1000);
    });
    
    if (returnFalse) {
      return false;
    }
  }, [returnFalse, onFire, setStateFired]);
  
  useEffect(() => keymap(keystroke, handleFire, {
    target,
    caseSensitive
  }), [keystroke, target, caseSensitive, handleFire]);
  
  useEffect(() => {
    return () => {
      if (stateClearFiredTimer) {
        clearTimeout(stateClearFiredTimer);
      }
    };
  }, [stateClearFiredTimer]);
  
  return <ScKeymapDemo>
    {splitKeystroke(keystroke).map((v, i) => <Kbd key={`${v}-${i}`}>{v === ' ' ? '空' : v}</Kbd>)}
    {stateFiredVisible ? <ScFired><span role="img">🎉</span> {stateFired}</ScFired> : null}
  </ScKeymapDemo>;
}