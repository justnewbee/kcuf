import {
  useCallback
} from 'react';

import useDispatchToggleLogEvents from './use-dispatch-toggle-log-events';

export default function useHandleToggleLogEvents(): (visible: boolean) => void {
  const dispatchToggleLogEvents = useDispatchToggleLogEvents();
  
  return useCallback((visible: boolean): void => {
    dispatchToggleLogEvents(visible);
  }, [dispatchToggleLogEvents]);
}
