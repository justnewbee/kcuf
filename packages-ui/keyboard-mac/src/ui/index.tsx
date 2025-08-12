import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  KEYBOARD_PADDING,
  KEYBOARD_WIDTH,
  KEYBOARD_HEIGHT,
  KEY_DATA_LIST
} from './const';
import KeyboardKey from './rc/keyboard-key';

const ScKeyboard = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 0 auto;
  padding: ${KEYBOARD_PADDING}px;
  box-sizing: border-box;
  width: ${KEYBOARD_WIDTH}px;
  height: ${KEYBOARD_HEIGHT}px;
  background: hsl(0 0% 95%);
  border-radius: 10px;
  box-shadow: 2px 0 2px hsl(0 0% 89%) inset, -2px 2px 3px hsl(0 0% 89%) inset, 1px -0 0 hsl(0 0% 76%) inset, 0 -2px 3px hsl(0 0% 76%) inset;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  user-select: none;
`;

export default function KeyboardUi(): ReactElement {
  return <ScKeyboard>
    {KEY_DATA_LIST.map(v => <KeyboardKey key={v.code} {...{
      data: v
    }} />)}
  </ScKeyboard>;
}
