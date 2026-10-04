import {
  EKeyboardCode
} from '../enum';

import useActiveCodes from './use-active-codes';
import useActiveModifiers from './use-active-modifiers';

export default function useIsKeyActive(): (code: EKeyboardCode) => boolean {
  const codes = useActiveCodes();
  const activeModifiers = useActiveModifiers();
  
  return (code: EKeyboardCode): boolean => {
    if (codes.includes(code)) {
      return true;
    }
    
    switch (code) {
    case EKeyboardCode.CONTROL_LEFT:
      return activeModifiers.control === 'left';
    case EKeyboardCode.CONTROL_RIGHT:
      return activeModifiers.control === 'right';
    case EKeyboardCode.ALT_LEFT:
      return activeModifiers.alt === 'left';
    case EKeyboardCode.ALT_RIGHT:
      return activeModifiers.alt === 'right';
    case EKeyboardCode.SHIFT_LEFT:
      return activeModifiers.shift === 'left';
    case EKeyboardCode.SHIFT_RIGHT:
      return activeModifiers.shift === 'right';
    case EKeyboardCode.META_LEFT:
      return activeModifiers.meta === 'left';
    case EKeyboardCode.META_RIGHT:
      return activeModifiers.meta === 'right';
    case EKeyboardCode.FN:
      return activeModifiers.fn === true;
    default:
      return false;
    }
  };
}
