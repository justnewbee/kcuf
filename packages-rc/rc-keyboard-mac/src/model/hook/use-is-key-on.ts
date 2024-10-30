import {
  useCallback
} from 'react';

import {
  EKeyboardCode
} from '../enum';

import useCapsLock from './use-caps-lock';

export default function useIsKeyOn(): (code: string) => boolean {
  const capsLock = useCapsLock();
  
  return useCallback((code: string): boolean => code === EKeyboardCode.CAPS_LOCK && capsLock, [capsLock]);
}