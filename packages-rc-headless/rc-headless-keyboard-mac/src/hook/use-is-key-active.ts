import {
  useCallback
} from 'react';

import {
  EKeyboardCode
} from '../enum';

import useCodes from './use-codes';
import useModifierState from './use-modifier-state';

export default function useIsKeyActive(): (code: string) => boolean {
  const codes = useCodes();
  const modifierState = useModifierState();
  
  return useCallback((code: string): boolean => {
    if (codes.includes(code)) {
      return true;
    }
    
    switch (code) {
      case EKeyboardCode.CONTROL_LEFT:
        return modifierState.control === 'left';
      case EKeyboardCode.CONTROL_RIGHT:
        return modifierState.control === 'right';
      case EKeyboardCode.ALT_LEFT:
        return modifierState.alt === 'left';
      case EKeyboardCode.ALT_RIGHT:
        return modifierState.alt === 'right';
      case EKeyboardCode.SHIFT_LEFT:
        return modifierState.shift === 'left';
      case EKeyboardCode.SHIFT_RIGHT:
        return modifierState.shift === 'right';
      case EKeyboardCode.META_LEFT:
        return modifierState.meta === 'left';
      case EKeyboardCode.META_RIGHT:
        return modifierState.meta === 'right';
      case EKeyboardCode.FN:
        return modifierState.fn === true;
      default:
        return false;
    }
  }, [codes, modifierState]);
}