import {
  useCallback
} from 'react';

import {
  EKeyboardCode
} from '../enum';

import useModifierState from './use-modifier-state';

export default function useIsKeyOn(): (code: string) => boolean {
  const modifierState = useModifierState();
  
  return useCallback((code: string): boolean => {
    return modifierState.capsLock ? code === EKeyboardCode.CAPS_LOCK : false;
  }, [modifierState]);
}