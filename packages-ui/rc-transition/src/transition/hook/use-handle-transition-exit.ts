import {
  useCallback
} from 'react';

import useDurationExit from './use-duration-exit';
import useDispatchSetTimer from './use-dispatch-set-timer';
import useHandleSetStatusExiting from './use-handle-set-status-exiting';
import useHandleSetStatusExited from './use-handle-set-status-exited';

export default function useHandleTransitionExit(): () => void {
  const durationExit = useDurationExit();
  const dispatchSetTimer = useDispatchSetTimer();
  const handleSetStatusExiting = useHandleSetStatusExiting();
  const handleSetStatusExited = useHandleSetStatusExited();
  
  return useCallback(() => {
    if (durationExit <= 0) {
      handleSetStatusExited();
      
      return;
    }
    
    handleSetStatusExiting();
    
    dispatchSetTimer(setTimeout(handleSetStatusExited, durationExit));
  }, [durationExit, dispatchSetTimer, handleSetStatusExiting, handleSetStatusExited]);
}
