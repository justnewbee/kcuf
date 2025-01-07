import {
  useCallback
} from 'react';

import useDurationOut from './use-duration-out';
import useDispatchSetTimer from './use-dispatch-set-timer';
import useHandleSetStatusExiting from './use-handle-set-status-exiting';
import useHandleSetStatusExited from './use-handle-set-status-exited';

export default function useHandleTransitionOut(): () => void {
  const durationOut = useDurationOut();
  const dispatchSetTimer = useDispatchSetTimer();
  const handleSetStatusExiting = useHandleSetStatusExiting();
  const handleSetStatusExited = useHandleSetStatusExited();
  
  return useCallback(() => {
    if (durationOut <= 0) {
      handleSetStatusExited();
      
      return;
    }
    
    handleSetStatusExiting();
    
    dispatchSetTimer(setTimeout(handleSetStatusExited, durationOut));
  }, [durationOut, dispatchSetTimer, handleSetStatusExiting, handleSetStatusExited]);
}
