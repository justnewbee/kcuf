import {
  EKeyboardCode
} from '../enum';

import useActiveModifiers from './use-active-modifiers';

export default function useIsKeyOn(): (code: EKeyboardCode) => boolean {
  const activeModifiers = useActiveModifiers();
  
  return (code: EKeyboardCode): boolean => {
    return activeModifiers.capsLock ? code === EKeyboardCode.CAPS_LOCK : false;
  };
}
