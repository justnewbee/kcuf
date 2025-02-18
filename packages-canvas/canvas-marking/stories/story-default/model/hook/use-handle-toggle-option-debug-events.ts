import {
  useCallback
} from 'react';

import useDispatchToggleOptionDebugEvents from './use-dispatch-toggle-option-debug-events';

export default function useHandleToggleOptionDebugEvents(): (value: boolean) => void {
  const dispatchToggleOptionDebugEvents = useDispatchToggleOptionDebugEvents();
  
  return useCallback((value: boolean): void => {
    if (value) {
      localStorage.debug = 'canvas-marking';
    } else {
      delete localStorage.debug;
    }
    
    dispatchToggleOptionDebugEvents();
  }, [dispatchToggleOptionDebugEvents]);
}
