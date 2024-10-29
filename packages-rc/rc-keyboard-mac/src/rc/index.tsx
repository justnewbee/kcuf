import {
  ReactElement,
  useState,
  useEffect
} from 'react';
import styled from 'styled-components';

import {
  KEY_DATA_LIST
} from '../const';
import {
  IKeyboardProps
} from '../types';
import {
  getKeyboardEventInfo
} from '../util';

/**
 * Mac 键盘每行键数有 14、13、12、9，需要保证每行左右齐平
 */
const KEY_SPACING = 2;
const KEY_WIDTH = 64;
const KEY_WIDTH_1 = 70; // 宽度 +1，用于 Command
const KEY_WIDTH_2 = 73; // 宽度 +2，用于 Escape、Backspace、Tab
const KEY_WIDTH_3 = 102; // 宽度 +3，用于 CapsLock、Enter
const KEY_WIDTH_4 = 136; // 宽度 +4，用于 Shift
const KEY_WIDTH_5 = 333; // 宽度 +5，用于 Space
const KEY_HEIGHT = 64;
const KEY_HEIGHT_SHORT = 30;
const KEYBOARD_PADDING = 10;
const KEYBOARD_WIDTH = 13 * KEY_WIDTH + KEY_WIDTH_2 + 28 * KEY_SPACING + 2 * KEYBOARD_PADDING;
const KEYBOARD_HEIGHT = 5 * KEY_HEIGHT + KEY_HEIGHT_SHORT + 12 * KEY_SPACING + 2 * KEYBOARD_PADDING;

const ScKeyboard = styled.div`
  position: relative;
  margin: 0 auto;
  padding: ${KEYBOARD_PADDING}px;
  width: ${KEYBOARD_WIDTH}px;
  height: ${KEYBOARD_HEIGHT}px;
  border-radius: 10px;
  background: hsl(0 0% 95%);
  box-shadow: 2px 0 2px hsl(0 0% 89%) inset, -2px 2px 3px hsl(0 0% 89%) inset, 1px -0px 0 hsl(0 0% 76%) inset, 0 -2px 3px hsl(0 0% 76%) inset;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  user-select: none;
`;

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

export default function Keyboard({
  className,
  style,
  listen = true,
  codes: codesInProps,
  capsLock: capsLockInProps,
  onKeyPress
}: IKeyboardProps): ReactElement {
  const [stateCapsLock, setStateCapsLock] = useState(false);
  const [stateCodes, setStateCodes] = useState<string[]>([]);
  
  useEffect(() => {
    if (!listen) {
      return;
    }
    
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    function onKeydown(e: KeyboardEvent): void {
      if (timer) {
        clearTimeout(timer);
      }
      
      const info = getKeyboardEventInfo(e);
      
      setStateCapsLock(info.capsLock);
      setStateCodes(info.codes);
      
      timer = setTimeout(() => {
        setStateCodes([]);
      }, 250);
    }
    
    document.addEventListener('keydown', onKeydown);
    
    return () => {
      document.removeEventListener('keydown', onKeydown);
      
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [listen]);
  
  return <ScKeyboard {...{
    className,
    style
  }}>
    {KEY_DATA_LIST.map(v => <ScKeyboardKey key={v.code} {...{
      'data-code': v.code,
      'data-on': v.code === 'CapsLock' && (capsLockInProps || stateCapsLock) ? '' : undefined,
      'data-active': codesInProps?.includes(v.code) || stateCodes.includes(v.code) ? '' : undefined,
      onClick: onKeyPress ? () => onKeyPress(v.code) : undefined
    }}>
      {Array.isArray(v.name) ? v.name.map(vv => <div key={`${vv}`}>{vv}</div>) : v.name}
    </ScKeyboardKey>)}
  </ScKeyboard>;
}