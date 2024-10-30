import {
  useCallback
} from 'react';

import {
  IKeyData
} from '../types';

import useModelProps from './_use-model-props';
import useIsShiftOn from './use-is-shift-on';
import useCapsLock from './use-caps-lock';

export default function useHandleKeyClick(): (data: IKeyData) => void {
  const {
    onKeyPress
  } = useModelProps();
  const capsLock = useCapsLock();
  const isShiftOn = useIsShiftOn();
  
  return useCallback((data: IKeyData) => {
    const shiftOn = isShiftOn();
    let key = data.key ?? data.code;
    
    if (shiftOn && data.keyShift) {
      key = data.keyShift;
    }
    
    // 设置中的字符是大写的，需判断是否要大写
    if (/^Key[A-Z]$/.test(data.code) && (capsLock ? shiftOn : !shiftOn)) {
      key = key.toLowerCase();
    }
    
    onKeyPress?.(data.code, key);
  }, [capsLock, isShiftOn, onKeyPress]);
}
