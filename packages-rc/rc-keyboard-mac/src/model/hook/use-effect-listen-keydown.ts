import {
  useEffect
} from 'react';

import {
  getKeyboardEventInfo
} from '../util';

import useModelProps from './_use-model-props';
import useDispatchSetCapsLock from './use-dispatch-set-caps-lock';
import useDispatchSetCodes from './use-dispatch-set-codes';

export default function useEffectListenKeydown(): void {
  const {
    listen
  } = useModelProps();
  const dispatchSetCodes = useDispatchSetCodes();
  const dispatchSetCapsLock = useDispatchSetCapsLock();
  
  useEffect(() => {
    if (!listen) {
      return;
    }
    
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    function onKeydown(e: KeyboardEvent): void {
      if (timer) {
        clearTimeout(timer);
      }
      
      const info = getKeyboardEventInfo(e);
      
      dispatchSetCodes(info.codes);
      dispatchSetCapsLock(info.capsLock);
      
      timer = setTimeout(() => {
        dispatchSetCodes([]);
      }, 250);
    }
    
    document.addEventListener('keydown', onKeydown);
    
    return () => {
      document.removeEventListener('keydown', onKeydown);
      
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [listen, dispatchSetCapsLock, dispatchSetCodes]);
}
