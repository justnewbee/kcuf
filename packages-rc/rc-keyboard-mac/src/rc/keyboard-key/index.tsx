import {
  ReactElement,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  IKeyboardKeyProps
} from '../../types';
import {
  KEY_HEIGHT,
  KEY_HEIGHT_SHORT,
  KEY_SPACING,
  KEY_WIDTH,
  KEY_WIDTH_1,
  KEY_WIDTH_2,
  KEY_WIDTH_3,
  KEY_WIDTH_4,
  KEY_WIDTH_5,
  KEYBOARD_PADDING
} from '../../const';
import {
  getKeyboardKeyDisplayName
} from '../../util';

const ScKeyboardKey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: ${KEY_SPACING}px;
  padding: 6px;
  width: ${KEY_WIDTH}px;
  height: ${KEY_HEIGHT}px;
  float: left;
  border-radius: 6px;
  box-shadow: 1px 0 0 hsl(0 0% 0%), 0 1px 0 hsl(0 0% 0%), -1px 0 0 hsl(0 0% 0%), 0 -1px 0 hsl(0 0% 0%);
  background: hsl(0 0% 8%);
  color: hsl(0 0% 90%);
  font-size: 12px;
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
    width: ${KEY_WIDTH_5}px;
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
  
  &[data-code=Backquote],
  &[data-code^=Digit],
  &[data-code^=Minus],
  &[data-code^=Equal],
  &[data-code^=Bracket],
  &[data-code=BackSlash],
  &[data-code=Semicolon],
  &[data-code=Quote],
  &[data-code=Comma],
  &[data-code=Period],
  &[data-code=Slash] {
    font-size: 14px;
  }
  
  &[data-code=Backspace],
  &[data-code=Tab],
  &[data-code=CapsLock],
  &[data-code=Enter],
  &[data-code^=Shift] {
    font-size: 16px;
  }
  
  &[data-code^=Key] {
    font-size: 18px;
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
  
  &[data-code^=Control],
  &[data-code^=Alt],
  &[data-code^=Meta] {
    justify-content: space-between;
    
    div:first-child {
      font-size: 14px;
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
  data,
  statusOn,
  statusActive,
  onClick
}: IKeyboardKeyProps): ReactElement {
  const handleClick = useCallback(() => onClick?.(data), [data, onClick]);
  const name = getKeyboardKeyDisplayName(data);
  
  return <ScKeyboardKey {...{
    'data-code': data.code,
    'data-on': statusOn ? '' : undefined,
    'data-active': statusActive ? '' : undefined,
    onClick: handleClick
  }}>
    {Array.isArray(name) ? name.map(vv => <div key={`${vv}`}>{vv}</div>) : name}
  </ScKeyboardKey>;
}