import {
  useCallback
} from 'react';

import {
  EKeyboardCode
} from '../enum';
import {
  IKeyboardModifiers
} from '../types';

import useModelProps from './_use-model-props';
import useActiveModifiers from './use-active-modifiers';
import useDispatchUpdateActiveModifiers from './use-dispatch-update-active-modifiers';

function determineLeftRight(code: EKeyboardCode, codeLeft: EKeyboardCode, codeRight: EKeyboardCode, currentValue?: '' | 'left' | 'right'): '' | 'left' | 'right' {
  switch (currentValue) {
    case 'left':
      return code === codeLeft ? '' : 'right';
    case 'right':
      return code === codeRight ? '' : 'left';
    default:
      return code === codeLeft ? 'left' : 'right';
  }
}

export default function useHandleUpdateActiveModifiers(): (code: EKeyboardCode) => void {
  const {
    activeModifiers: activeModifiersInProps,
    onActiveModifiersChange
  } = useModelProps();
  const activeModifiers = useActiveModifiers();
  const dispatchUpdateModifierState = useDispatchUpdateActiveModifiers();
  
  return useCallback((code: EKeyboardCode) => {
    if (!activeModifiersInProps) {
      return;
    }
    
    const updates: IKeyboardModifiers | undefined = (() => {
      switch (code) {
        case EKeyboardCode.CONTROL_LEFT:
        case EKeyboardCode.CONTROL_RIGHT:
          return {
            control: determineLeftRight(code, EKeyboardCode.CONTROL_LEFT, EKeyboardCode.CONTROL_RIGHT, activeModifiers.control)
          };
        case EKeyboardCode.ALT_LEFT:
        case EKeyboardCode.ALT_RIGHT:
          return {
            alt: determineLeftRight(code, EKeyboardCode.ALT_LEFT, EKeyboardCode.ALT_RIGHT, activeModifiers.alt)
          };
        case EKeyboardCode.SHIFT_LEFT:
        case EKeyboardCode.SHIFT_RIGHT:
          return {
            shift: determineLeftRight(code, EKeyboardCode.SHIFT_LEFT, EKeyboardCode.SHIFT_RIGHT, activeModifiers.shift)
          };
        case EKeyboardCode.META_LEFT:
        case EKeyboardCode.META_RIGHT:
          return {
            meta: determineLeftRight(code, EKeyboardCode.META_LEFT, EKeyboardCode.META_RIGHT, activeModifiers.meta)
          };
        case EKeyboardCode.FN:
          return {
            fn: !activeModifiers.fn
          };
        default: // 注意这里不处理 CapsLock
          break;
      }
    })();
    
    if (updates) {
      dispatchUpdateModifierState(updates);
      
      onActiveModifiersChange?.({
        ...activeModifiers,
        ...updates
      });
    }
  }, [dispatchUpdateModifierState, activeModifiers, activeModifiersInProps, onActiveModifiersChange]);
}
