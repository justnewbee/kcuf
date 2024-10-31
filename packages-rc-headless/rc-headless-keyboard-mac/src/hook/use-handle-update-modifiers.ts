import {
  useCallback
} from 'react';

import {
  EKeyboardCode
} from '../enum';
import {
  IModifierState
} from '../types';

import useModelProps from './_use-model-props';
import useModifierState from './use-modifier-state';
import useDispatchUpdateModifierState from './use-dispatch-update-modifier-state';

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

export default function useHandleUpdateModifiers(): (code: EKeyboardCode) => void {
  const {
    modifierState: modifierStateInProps,
    onModifierStateChange
  } = useModelProps();
  const modifierState = useModifierState();
  const dispatchUpdateModifierState = useDispatchUpdateModifierState();
  
  return useCallback((code: EKeyboardCode) => {
    if (!modifierStateInProps) {
      return;
    }
    
    const updates: IModifierState | undefined = (() => {
      switch (code) {
        case EKeyboardCode.CONTROL_LEFT:
        case EKeyboardCode.CONTROL_RIGHT:
          return {
            control: determineLeftRight(code, EKeyboardCode.CONTROL_LEFT, EKeyboardCode.CONTROL_RIGHT, modifierState.control)
          };
        case EKeyboardCode.ALT_LEFT:
        case EKeyboardCode.ALT_RIGHT:
          return {
            alt: determineLeftRight(code, EKeyboardCode.ALT_LEFT, EKeyboardCode.ALT_RIGHT, modifierState.alt)
          };
        case EKeyboardCode.SHIFT_LEFT:
        case EKeyboardCode.SHIFT_RIGHT:
          return {
            shift: determineLeftRight(code, EKeyboardCode.SHIFT_LEFT, EKeyboardCode.SHIFT_RIGHT, modifierState.shift)
          };
        case EKeyboardCode.META_LEFT:
        case EKeyboardCode.META_RIGHT:
          return {
            meta: determineLeftRight(code, EKeyboardCode.META_LEFT, EKeyboardCode.META_RIGHT, modifierState.meta)
          };
        case EKeyboardCode.CAPS_LOCK:
          return {
            capsLock: !modifierState.capsLock
          };
        case EKeyboardCode.FN:
          return {
            fn: !modifierState.fn
          };
        default:
          break;
      }
    })();
    
    if (updates) {
      dispatchUpdateModifierState(updates);
      
      onModifierStateChange?.({
        ...modifierState,
        ...updates
      });
    }
  }, [dispatchUpdateModifierState, modifierState, modifierStateInProps, onModifierStateChange]);
}
