import {
  useCallback
} from 'react';

import {
  EKeyboardCode
} from '../enum';

import useActiveModifiers from './use-active-modifiers';

export default function useIsKeyOn(): (code: string) => boolean {
  const activeModifiers = useActiveModifiers();
  
  return useCallback((code: string): boolean => {
    return activeModifiers.capsLock ? code === EKeyboardCode.CAPS_LOCK : false;
  }, [activeModifiers]);
}