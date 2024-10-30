import {
  ReactElement,
  useState,
  useEffect,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  EKeyboardCode
} from '../enum';
import {
  IKeyboardProps,
  IKeyData
} from '../types';
import {
  KEYBOARD_PADDING,
  KEYBOARD_WIDTH,
  KEYBOARD_HEIGHT,
  KEY_DATA_LIST
} from '../const';
import {
  getKeyboardEventInfo
} from '../util';

import KeyboardKey from './keyboard-key';

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

export default function Keyboard({
  className,
  style,
  codes: codesInProps,
  capsLock: capsLockInProps,
  listen = true,
  displayEvent = true,
  onKeyPress
}: IKeyboardProps): ReactElement {
  const [stateCapsLock, setStateCapsLock] = useState(false);
  const [stateCodes, setStateCodes] = useState<string[]>([]);
  const shiftIsOn = codesInProps ? codesInProps.includes(EKeyboardCode.SHIFT_LEFT) || codesInProps.includes(EKeyboardCode.SHIFT_RIGHT) : false;
  
  const handleKeyClick = useCallback((data: IKeyData) => {
    let key = data.key ?? data.code;
    
    if (shiftIsOn && data.keyShift) {
      key = data.keyShift;
    }
    
    // 设置中的字符是大写的，需判断是否要大写
    if (/^Key[A-Z]$/.test(data.code) && (stateCapsLock ? shiftIsOn : !shiftIsOn)) {
      key = key.toLowerCase();
    }
    
    onKeyPress?.(data.code, key);
  }, [stateCapsLock, shiftIsOn, onKeyPress]);
  
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
    {KEY_DATA_LIST.map(v => <KeyboardKey key={v.code} {...{
      data: v,
      statusOn: v.code === EKeyboardCode.CAPS_LOCK && (capsLockInProps || stateCapsLock),
      statusActive: codesInProps?.includes(v.code) || stateCodes.includes(v.code),
      displayEvent,
      onClick: handleKeyClick
    }} />)}
  </ScKeyboard>;
}