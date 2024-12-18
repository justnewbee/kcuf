import {
  ReactElement,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  KeyData,
  useIsKeyActive,
  useIsKeyOn,
  useHandleKeyClick
} from '@kcuf/rc-headless-keyboard-mac';

import {
  KEY_HEIGHT,
  KEY_HEIGHT_SHORT,
  KEY_SPACING,
  KEY_PADDING,
  KEY_WIDTH,
  KEY_WIDTH_1,
  KEY_WIDTH_2,
  KEY_WIDTH_3,
  KEY_WIDTH_4,
  KEY_WIDTH_5,
  KEY_FONT_SIZE,
  KEYBOARD_PADDING
} from '../../const';
import KeyboardKeyName from '../keyboard-key-name';

interface IProps {
  data: KeyData;
}

const ScKeyboardKey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: ${KEY_SPACING}px;
  padding: ${KEY_PADDING}px;
  width: ${KEY_WIDTH}px;
  height: ${KEY_HEIGHT}px;
  border-radius: 6px;
  background: hsl(0 0% 8%);
  color: hsl(0 0% 90%);
  font-size: ${KEY_FONT_SIZE}px;
  line-height: 1.6;
  box-sizing: border-box;
  transition: all 400ms ease-in;
  cursor: pointer;
  
  &:active,
  &[data-active] {
    color: hsl(100 100% 49%);
    background-color: hsl(249 100% 20%);
    transition: 1ms linear;
  }
  
  &[data-code^=Meta] {
    width: ${KEY_WIDTH_1}px;
  }
  
  &[data-code=Escape],
  &[data-code=Backspace],
  &[data-code=Tab] {
    width: ${KEY_WIDTH_2}px;
  }
  
  &[data-code=CapsLock],
  &[data-code=Enter] {
    width: ${KEY_WIDTH_3}px;
  }
  
  &[data-code^=Shift] {
    width: ${KEY_WIDTH_4}px;
  }
  
  &[data-code=Space] {
    padding-left: ${KEY_PADDING * 2}px;
    padding-right: ${KEY_PADDING * 2}px;
    width: ${KEY_WIDTH_5}px;
    justify-content: flex-end;
  }
  
  &[data-code=Escape],
  &[data-code^=F], // F1-F12
  &[data-code=Power] {
    height: ${KEY_HEIGHT_SHORT}px;
  }
  
  &[data-code=Escape],
  &[data-code=AltRight],
  &[data-code=MetaRight] {
    align-items: flex-start;
  }
  
  &[data-code=Tab],
  &[data-code=CapsLock],
  &[data-code^=ShiftLeft] {
    align-items: flex-start;
    justify-content: flex-end;
  }
  
  &[data-code=Backspace],
  &[data-code=Enter],
  &[data-code=ShiftRight] {
    align-items: flex-end;
    justify-content: flex-end;
  }
  
  &[data-code^=TheFn] {
    align-items: flex-start;
    justify-content: flex-end;
  }
  
  &[data-code=ControlLeft],
  &[data-code=AltLeft],
  &[data-code=MetaLeft] {
    align-items: flex-end;
  }
  
  &[data-code^=TheFn],
  &[data-code^=Escape],
  &[data-code^=F], // F1-F12
  &[data-code^=Power],
  &[data-code^=Arrow] {
    font-size: ${KEY_FONT_SIZE - 2}px;
  }
  
  &[data-code=Backspace],
  &[data-code=Tab],
  &[data-code=CapsLock],
  &[data-code=Enter],
  &[data-code^=Shift],
  &[data-code^=Control],
  &[data-code^=Alt],
  &[data-code^=Meta] {
    font-size: ${KEY_FONT_SIZE + 2}px;
  }
  
  &[data-code^=Key] {
    font-size: ${KEY_FONT_SIZE + 4}px;
  }
  
  &[data-code^=Control],
  &[data-code^=Alt],
  &[data-code^=Meta] {
    justify-content: space-between;
    
    div:last-child {
      font-size: ${KEY_FONT_SIZE - 2}px;
    }
  }
  
  &[data-code=CapsLock] {
    &::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 6px;
      width: 6px;
      height: 6px;
      background: hsl(0 0% 100%);
      border-radius: 100%;
    }
    
    &[data-on] {
      &::before {
        background: hsl(114 100% 50%);
      }
    }
  }
  
  &[data-code=ArrowUp],
  &[data-code=ArrowDown] {
    height: ${KEY_HEIGHT / 2 - 1}px;
  }
  
  &[data-code=ArrowUp] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  &[data-code=ArrowDown] {
    position: absolute;
    bottom: ${KEYBOARD_PADDING}px;
    right: ${KEYBOARD_PADDING + KEY_WIDTH + KEY_SPACING * 2}px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

export default function KeyboardKey({
  data
}: IProps): ReactElement {
  const isKeyActive = useIsKeyActive();
  const isKeyOn = useIsKeyOn();
  const handleKeyClick = useHandleKeyClick();
  const handleClick = useCallback(() => handleKeyClick(data), [data, handleKeyClick]);
  
  return <ScKeyboardKey {...{
    'data-code': data.code,
    'data-active': isKeyActive(data.code) ? '' : undefined,
    'data-on': isKeyOn(data.code) ? '' : undefined,
    onClick: handleClick
  }}>
    <KeyboardKeyName data={data} />
  </ScKeyboardKey>;
}