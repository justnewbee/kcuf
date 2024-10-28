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

const KEYBOARD_WIDTH = 995;
const KEYBOARD_HEIGHT = 394;
const KEY_WIDTH = 62;
const KEY_HEIGHT = 62;
const KEY_HEIGHT_SHORT = 28;

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
  width: ${KEY_WIDTH}px;
  height: ${KEY_HEIGHT}px;
  float: left;
  list-style: none;
  margin-right: 5px;
  margin-bottom: 5px;
  background: hsl(0 0% 8%);
  color: hsl(0 0% 78%);
  text-align: center;
  line-height: ${KEY_HEIGHT}px;
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid hsl(0 0% 23%);
  box-shadow: 1px 0 0 rgb(0, 0, 0), 0 1px 0 rgb(0, 0, 0), -1px 0 0 rgb(0, 0, 0), 0 -1px 0 rgb(0, 0, 0);
  box-sizing: initial;
  transition: all 0.4s ease-in;
  user-select: none;
  cursor: pointer;
  position: relative;
  
  &:active,
  &[data-active] {
    color: hsl(100 100% 49%);
    background-color: hsl(249 100% 20%);
    border: 1px solid hsl(252 54% 30%);
    transition: 1ms linear;
  }
  
  &[data-code=Escape],
  &[data-code^=F],
  &[data-code=Power] {
    height: ${KEY_HEIGHT_SHORT}px;
    line-height: ${KEY_HEIGHT_SHORT}px;
  }
  
  &[data-code=Escape] {
    width: 99px;
    text-indent: 1em;
    text-align: left;
  }
  
  &[data-code^=F], // F1-F12
  &[data-code=Power] {
    width: 60px;
  }
  
  &[data-code=Backquote],
  &[data-code^=Digit],
  &[data-code^=Minus],
  &[data-code^=Equal],
  &[data-code=BracketLeft],
  &[data-code=BracketRight],
  &[data-code=BackSlash],
  &[data-code=Semicolon],
  &[data-code=Quote],
  &[data-code=Comma],
  &[data-code=Period],
  &[data-code=Slash] {
    padding: 7px 0;
    height: 48px;
    
    span {
      line-height: 23px;
      height: 23px;
      width: 100%;
      float: left;
      font-size: 14px;
    }
  }
  
  &[data-code=Backspace],
  &[data-code=Tab],
  &[data-code=Enter],
  &[data-code^=Shift] {
    font-size: 16px;
  }
  
  &[data-code=Backspace],
  &[data-code=Enter],
  &[data-code=ShiftRight] {
    span {
      line-height: 14px;
      margin-top: 40px;
      float: right;
      margin-right: 8px;
    }
  }
  
  &[data-code^=Key] {
    font-size: 18px;
    line-height: 64px;
  }
  
  &[data-code=Tab],
  &[data-code=CapsLock],
  &[data-code=ShiftLeft],
  &[data-code=TheFn],
  &[data-code=ControlLeft],
  &&[data-code=AltLeft],
  &[data-code=Slash],
  &[data-code=MetaRight],
  &[data-code=AltRight] {
    span {
      line-height: 14px;
      margin-top: 43px;
      text-indent: 5px;
      float: left;
    }
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
    
    &:active {
      &::before {
        background: #52f800;
      }
    }
  }
  
  &[data-code=Enter] span:first-child,
  &&[data-code=AltLeft] span:first-child {
    position: absolute;
    right: 0;
    top: -37px;
    font-size: 12px;
    line-height: 12px;
  }
  
  &&[data-code=AltLeft] span:first-child {
    left: 0;
    text-align: left;
  }
  
  &[data-code=AltRight] span:first-child {
    position: absolute;
    left: 0;
    top: -37px;
    font-size: 12px;
    line-height: 12px;
  }
  
  &[data-code=ShiftLeft] {
    width: 136px;
  }
  
  &[data-code=ShiftRight] {
    width: 137px;
  }
  
  &[data-code^=Meta] {
    width: 70px;
  }
  
  &[data-code=Space] {
    width: 333px;
  }
  
  &[data-code=ArrowUp],
  &[data-code=ArrowDown] {
    height: 29px;
    line-height: 29px;
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
    right: 84px;
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
      
      const {
        code
      } = e;
      const codes: string[] = [code];
      
      function pushModifierKeyCode(modKey: boolean, modCode: string): void {
        if (modKey && modCode !== code) {
          codes.push(modCode);
        }
      }

      pushModifierKeyCode(e.ctrlKey, 'ControlLeft');
      pushModifierKeyCode(e.altKey, 'AltLeft');
      pushModifierKeyCode(e.shiftKey, 'ShiftLeft');
      pushModifierKeyCode(e.metaKey, 'MetaLeft');
      
      setStateCodes(codes);
      
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