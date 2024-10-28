import {
  ReactElement,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';

import {
  KEY_DATA_LIST
} from './const';
import {
  IMacKeyBoardProps
} from './types';
import {
  getKeyboardEventCodes
} from './util';

const KEYBOARD_WIDTH = 982;
const KEYBOARD_HEIGHT = 394;
const KEY_WIDTH = 64;
const KEY_HEIGHT = 64;
const KEY_HEIGHT_SHORT = 30;

const ScMacKeyboard = styled.div`
  position: relative;
  margin: 0 auto;
  width: ${KEYBOARD_WIDTH}px;
  height: ${KEYBOARD_HEIGHT}px;
  border-radius: 10px;
  border: 1px solid hsl(0 0% 79%);
  background: hsl(0 0% 95%);
  box-shadow: 2px 0 2px hsl(0 0% 89%) inset, -2px 2px 3px hsl(0 0% 89%) inset, 1px -0px 0 hsl(0 0% 76%) inset, 0 -2px 3px hsl(0 0% 76%) inset;
  user-select: none;
`;

const ScMacKeyBoardUl = styled.ul`
  width: ${KEYBOARD_WIDTH - 3}px;
  margin-top: 9px;
  padding-left: 11px;
  position: relative;
  float: left;
`;

const ScMacKeyBoardLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2px;
  padding: 6px;
  width: ${KEY_WIDTH}px;
  height: ${KEY_HEIGHT}px;
  float: left;
  list-style: none;
  border: 1px solid hsl(0 0% 23%);
  border-radius: 8px;
  box-shadow: 1px 0 0 rgb(0, 0, 0), 0 1px 0 rgb(0, 0, 0), -1px 0 0 rgb(0, 0, 0), 0 -1px 0 rgb(0, 0, 0);
  background: hsl(0 0% 8%);
  color: hsl(0 0% 90%);
  text-align: center;
  font-size: 12px;
  box-sizing: border-box;
  transition: all 0.4s ease-in;
  user-select: none;
  cursor: pointer;
  
  &:active,
  &[data-active] {
    color: hsl(100 100% 49%);
    background-color: hsl(249 100% 20%);
    border: 1px solid hsl(252 54% 30%);
    transition: 1ms linear;
  }
  
  // first row
  &[data-code=Escape],
  &[data-code^=F], // F1-F12
  &[data-code=Power] {
    height: ${KEY_HEIGHT_SHORT}px;
  }
  
  &[data-code=Escape] {
    width: 99px;
    text-indent: 1em;
    text-align: left;
  }
  
  &[data-code^=F], // F1-F12
  &[data-code=Power] {
    width: 62px;
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
  
  &[data-code=Tab],
  &[data-code=CapsLock],
  &[data-code^=ShiftLeft] {
    justify-content: flex-end;
    align-items: flex-start;
  }
  
  &[data-code=Backspace],
  &[data-code=Enter],
  &[data-code=ShiftRight] {
    justify-content: flex-end;
    align-items: flex-end;
  }
  
  &[data-code^=Key] {
    font-size: 18px;
  }
  
  &[data-code=Backspace],
  &[data-code=Tab] {
    width: 73px;
  }
  
  &[data-code=CapsLock],
  &[data-code=Enter] {
    width: 102px;
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
      border-radius: 3px;
    }
    
    &:active,
    &[data-active] {
      &::before {
        background: #52f800;
      }
    }
  }
  
  &[data-code=ShiftLeft] {
    width: 136px;
  }
  
  &[data-code=ShiftRight] {
    width: 137px;
  }
  
  &[data-code^=TheFn] {
    justify-content: flex-end;
    align-items: flex-start;
  }
  
  &[data-code^=Control],
  &[data-code^=Alt],
  &[data-code^=Meta] {
    justify-content: space-between;
    
    span:first-child {
      font-size: 14px;
    }
  }
  
  &[data-code=ControlLeft],
  &[data-code=AltLeft],
  &[data-code=MetaLeft] {
    align-items: flex-end;
  }
  
  &[data-code=AltRight],
  &[data-code=MetaRight] {
    align-items: flex-start;
  }
  
  &[data-code^=Meta] {
    width: 70px;
  }
  
  &[data-code=Space] {
    width: 333px;
  }
  
  &[data-code=ArrowUp],
  &[data-code=ArrowDown] {
    height: 31px;
  }
  
  &[data-code=ArrowUp] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  &[data-code=ArrowDown] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    position: absolute;
    bottom: 0;
    right: 86px;
  }
`;

export default function MacKeyBoard({
  listen = true,
  ...props
}: IMacKeyBoardProps): ReactElement {
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
      
      setStateCodes(getKeyboardEventCodes(e));
      
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
  
  return <ScMacKeyboard {...props}>
    <ScMacKeyBoardUl>
      {KEY_DATA_LIST.map(v => <ScMacKeyBoardLi key={v.code} {...{
        'data-code': v.code,
        'data-active': stateCodes.includes(v.code) ? '' : undefined
      }}>
        {Array.isArray(v.name) ? v.name.map(vv => <span key={`${vv}`}>{vv}</span>) : <span>{v.name}</span>}
      </ScMacKeyBoardLi>)}
    </ScMacKeyBoardUl>
  </ScMacKeyboard>;
}