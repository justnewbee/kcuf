import {
  useCallback
} from 'react';

import useDurationIn from './use-duration-in';
import useDispatchSetTimer from './use-dispatch-set-timer';
import useHandleSetStatusEntering from './use-handle-set-status-entering';
import useHandleSetStatusEntered from './use-handle-set-status-entered';
import useHandleForceReflow from './use-handle-force-reflow';

export default function useHandleTransitionIn(): () => void {
  const durationIn = useDurationIn();
  const handleForceReflow = useHandleForceReflow();
  const dispatchSetTimer = useDispatchSetTimer();
  const handleSetStatusEntering = useHandleSetStatusEntering();
  const handleSetStatusEntered = useHandleSetStatusEntered();
  
  return useCallback(() => {
    handleForceReflow();
    
    if (durationIn <= 0) {
      handleSetStatusEntered();
      
      return;
    }
    
    handleSetStatusEntering();
    
    dispatchSetTimer(setTimeout(handleSetStatusEntered, durationIn));
  }, [durationIn, dispatchSetTimer, handleForceReflow, handleSetStatusEntering, handleSetStatusEntered]);
}
