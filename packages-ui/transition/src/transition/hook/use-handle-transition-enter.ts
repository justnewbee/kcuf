import {
  useCallback
} from 'react';

import useDurationEnter from './use-duration-enter';
import useDispatchSetTimer from './use-dispatch-set-timer';
import useHandleSetStatusEntering from './use-handle-set-status-entering';
import useHandleSetStatusEntered from './use-handle-set-status-entered';
import useHandleForceReflow from './use-handle-force-reflow';

export default function useHandleTransitionEnter(): () => void {
  const durationEnter = useDurationEnter();
  const handleForceReflow = useHandleForceReflow();
  const dispatchSetTimer = useDispatchSetTimer();
  const handleSetStatusEntering = useHandleSetStatusEntering();
  const handleSetStatusEntered = useHandleSetStatusEntered();
  
  return useCallback(() => {
    handleForceReflow();
    
    if (durationEnter <= 0) {
      handleSetStatusEntered();
      
      return;
    }
    
    handleSetStatusEntering();
    
    dispatchSetTimer(setTimeout(handleSetStatusEntered, durationEnter));
  }, [durationEnter, dispatchSetTimer, handleForceReflow, handleSetStatusEntering, handleSetStatusEntered]);
}
