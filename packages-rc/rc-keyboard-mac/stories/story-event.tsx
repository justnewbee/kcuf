import {
  ReactElement,
  useCallback,
  useState
} from 'react';
import styled from 'styled-components';

import Keyboard, {
  KeyboardCode
} from '../src';

const ScLastPress = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export default function StoryEvent(): ReactElement {
  const [stateLastKeyPress, setStateLastKeyPress] = useState<null | [string, string]>(null);
  const [stateShift, setStateShift] = useState<KeyboardCode.SHIFT_LEFT | KeyboardCode.SHIFT_RIGHT | ''>('');
  const handleKeyPress = useCallback((key: string, code: KeyboardCode) => {
    setStateLastKeyPress([key, code]);
    
    switch (code) { // 记住 Shift 柱状
      case KeyboardCode.SHIFT_LEFT:
      case KeyboardCode.SHIFT_RIGHT:
        setStateShift(value => {
          return value === code ? '' : code;
        });
        
        break;
      default:
        break;
    }
  }, []);
  
  return <>
    <Keyboard {...{
      codes: stateShift ? [stateShift] : undefined,
      onKeyPress: handleKeyPress
    }} />
    {stateLastKeyPress ? <ScLastPress><code>{stateLastKeyPress[0]}</code> / <code>{stateLastKeyPress[1]}</code></ScLastPress> : null}
  </>;
}