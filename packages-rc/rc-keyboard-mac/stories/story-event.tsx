import {
  ReactElement,
  useCallback,
  useState
} from 'react';
import styled from 'styled-components';

import Keyboard, {
  KeyboardModifiers,
  KeyboardCode
} from '../src';

const ScLastPress = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export default function StoryEvent(): ReactElement {
  const [stateActiveModifiers, setStateActiveModifiers] = useState<KeyboardModifiers>({});
  const [stateLastKeyPress, setStateLastKeyPress] = useState<null | [string, KeyboardCode]>(null);
  const handleKeyPress = useCallback((key: string, code: KeyboardCode) => {
    setStateLastKeyPress([key, code]);
  }, []);
  
  return <>
    <Keyboard {...{
      activeModifiers: stateActiveModifiers,
      onKeyPress: handleKeyPress,
      onModifierStateChange: setStateActiveModifiers
    }} />
    {stateLastKeyPress ? <ScLastPress><code>{stateLastKeyPress[0]}</code> / <code>{stateLastKeyPress[1]}</code></ScLastPress> : null}
  </>;
}