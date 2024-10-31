import {
  useCallback
} from 'react';

import {
  IKeyData,
  IKeyDetails
} from '../types';

import useModelProps from './_use-model-props';
import useModifierState from './use-modifier-state';
import useDispatchSetKeyDetails from './use-dispatch-set-key-details';
import useHandleUpdateModifiers from './use-handle-update-modifiers';

export default function useHandleKeyClick(): (data: IKeyData) => void {
  const {
    detailsInSpace,
    onKeyPress
  } = useModelProps();
  const modifierState = useModifierState();
  const dispatchSetKeyDetails = useDispatchSetKeyDetails();
  const handleUpdateModifiers = useHandleUpdateModifiers();
  
  return useCallback((data: IKeyData) => {
    const details: IKeyDetails = {
      key: data.key ?? data.code,
      code: data.code,
      control: !!modifierState.control,
      alt: !!modifierState.alt,
      shift: !!modifierState.shift,
      meta: !!modifierState.meta
    };
    
    if (details.shift && data.keyShift) {
      details.key = data.keyShift;
    }
    
    // 设置中的字符是大写的，需判断是否要大写
    if (/^Key[A-Z]$/.test(data.code) && (modifierState.capsLock ? details.shift : !details.shift)) {
      details.key = details.key.toLowerCase();
    }
    
    if (modifierState.fn && details.key === 'Backspace') {
      details.key = 'Delete';
    }
    
    onKeyPress?.(details.key, data.code);
    
    if (detailsInSpace) {
      dispatchSetKeyDetails(details);
    }
    
    handleUpdateModifiers(data.code);
  }, [detailsInSpace, dispatchSetKeyDetails, handleUpdateModifiers, modifierState, onKeyPress]);
}
