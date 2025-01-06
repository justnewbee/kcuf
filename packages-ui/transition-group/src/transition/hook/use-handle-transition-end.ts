import {
  useCallback
} from 'react';

import useModelProps from './_use-model-props';

export default function useHandleTransitionEnd(): (timeout: number, handler: () => void) => void {
  const {
    nodeRef
  } = useModelProps();
  
  return useCallback((timeout: number, handler: () => void) => {
    if (!nodeRef.current || !timeout) {
      setTimeout(handler, 0);
      
      return;
    }
    
    setTimeout(handler, timeout);
  }, [nodeRef]);
}
