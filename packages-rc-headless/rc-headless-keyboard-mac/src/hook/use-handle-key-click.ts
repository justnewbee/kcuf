import {
  useCallback
} from 'react';

import {
  IKeyData,
  IKeyDetails
} from '../types';

import useModelProps from './_use-model-props';
import useActiveModifiers from './use-active-modifiers';
import useDispatchSetKeyDetails from './use-dispatch-set-key-details';
import useHandleUpdateActiveModifiers from './use-handle-update-active-modifiers';

export default function useHandleKeyClick(): (data: IKeyData) => void {
  const {
    detailsInSpace,
    onKeyPress
  } = useModelProps();
  const activeModifiers = useActiveModifiers();
  const dispatchSetKeyDetails = useDispatchSetKeyDetails();
  const handleUpdateModifiers = useHandleUpdateActiveModifiers();
  
  return useCallback((data: IKeyData) => {
    const details: IKeyDetails = {
      key: data.key ?? data.code,
      code: data.code,
      control: !!activeModifiers.control,
      alt: !!activeModifiers.alt,
      shift: !!activeModifiers.shift,
      meta: !!activeModifiers.meta
    };
    
    if (details.shift && data.keyShift) {
      details.key = data.keyShift;
    }
    
    // 设置中的字符是大写的，需判断是否要大写
    if (/^Key[A-Z]$/.test(data.code) && (activeModifiers.capsLock ? details.shift : !details.shift)) {
      details.key = details.key.toLowerCase();
    }
    
    if (activeModifiers.fn && details.key === 'Backspace') {
      details.key = 'Delete';
    }
    
    onKeyPress?.(details.key, data.code);
    
    if (detailsInSpace) {
      dispatchSetKeyDetails(details);
    }
    
    handleUpdateModifiers(data.code);
  }, [detailsInSpace, dispatchSetKeyDetails, handleUpdateModifiers, activeModifiers, onKeyPress]);
}
