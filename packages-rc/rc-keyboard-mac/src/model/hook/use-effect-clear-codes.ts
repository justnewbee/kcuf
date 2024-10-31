import {
  useEffect
} from 'react';

import useModelState from './_use-model-state';
import useDispatchSetCodes from './use-dispatch-set-codes';

export default function useEffectClearCodes(): void {
  const {
    codes
  } = useModelState();
  const dispatchSetCodes = useDispatchSetCodes();
  
  useEffect(() => {
    if (!codes.length) {
      return;
    }
    
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    timer = setTimeout(() => {
      dispatchSetCodes([]);
      timer = null;
    }, 250);
    
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [codes, dispatchSetCodes]);
}
