import {
  useEffect
} from 'react';

import {
  getEventInfo
} from '../util';

import useModelProps from './_use-model-props';
import useDispatchSetCapsLock from './use-dispatch-set-caps-lock';
import useDispatchSetCodes from './use-dispatch-set-codes';

export default function useEffectListen(): void {
  const {
    listen
  } = useModelProps();
  const dispatchSetCodes = useDispatchSetCodes();
  const dispatchSetCapsLock = useDispatchSetCapsLock();
  
  useEffect(() => {
    if (!listen) {
      return;
    }
    
    function onKeydown(e: KeyboardEvent): void {
      const info = getEventInfo(e);
      
      dispatchSetCodes(info.codes);
      dispatchSetCapsLock(info.capsLock);
    }
    
    document.addEventListener('keydown', onKeydown);
    
    return () => document.removeEventListener('keydown', onKeydown);
  }, [listen, dispatchSetCapsLock, dispatchSetCodes]);
}
