import {
  useCallback
} from 'react';

import {
  EKeyboardCode
} from '../enum';
import {
  IKeyData,
  IKeyDetails
} from '../types';

import useModelProps from './_use-model-props';
import useCapsLock from './use-caps-lock';
import useDispatchSetKeyDetails from './use-dispatch-set-key-details';

export default function useHandleKeyClick(): (data: IKeyData) => void {
  const {
    codes = [],
    detailsInSpace,
    onKeyPress
  } = useModelProps();
  const capsLock = useCapsLock();
  const dispatchSetKeyDetails = useDispatchSetKeyDetails();
  
  return useCallback((data: IKeyData) => {
    const details: IKeyDetails = {
      key: data.key ?? data.code,
      code: data.code,
      ctrl: codes.includes(EKeyboardCode.CONTROL_LEFT) || codes.includes(EKeyboardCode.CONTROL_RIGHT),
      alt: codes.includes(EKeyboardCode.ALT_LEFT) || codes.includes(EKeyboardCode.ALT_RIGHT),
      shift: codes.includes(EKeyboardCode.SHIFT_LEFT) || codes.includes(EKeyboardCode.SHIFT_RIGHT),
      meta: codes.includes(EKeyboardCode.META_LEFT) || codes.includes(EKeyboardCode.META_RIGHT)
    };
    
    if (details.shift && data.keyShift) {
      details.key = data.keyShift;
    }
    
    // 设置中的字符是大写的，需判断是否要大写
    if (/^Key[A-Z]$/.test(data.code) && (capsLock ? details.shift : !details.shift)) {
      details.key = details.key.toLowerCase();
    }
    
    if (codes.includes(EKeyboardCode.FN) && details.key === 'Backspace') {
      details.key = 'Delete';
    }
    
    onKeyPress?.(details.key, data.code);
    
    if (detailsInSpace) {
      dispatchSetKeyDetails(details);
    }
  }, [codes, capsLock, onKeyPress, detailsInSpace, dispatchSetKeyDetails]);
}
