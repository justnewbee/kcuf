import {
  useCallback
} from 'react';

import {
  ETransactionStatus
} from '../enum';

import useModelProps from './_use-model-props';
import useDurations from './use-durations';
import useHandleSetStatus from './use-handle-set-status';
import useHandleTransitionEnd from './use-handle-transition-end';

export default function useHandlePerformEnter(): (mounting: boolean) => void {
  const {
    enter,
    onEnter,
    onEntering,
    onEntered
  } = useModelProps();
  const durations = useDurations();
  const handleSetStatus = useHandleSetStatus();
  const handleTransitionEnd = useHandleTransitionEnd();
  
  return useCallback((mounting: boolean) => {
    const appearing = mounting;
    
    const enterTimeout = appearing ? durations.appear : durations.enter;
    
    if (!mounting && !enter) {
      handleSetStatus(ETransactionStatus.ENTERED, () => {
        onEntered?.(mounting);
      });
      
      return;
    }
    
    onEnter?.(appearing);
    
    handleSetStatus(ETransactionStatus.ENTERING, () => {
      onEntering?.(appearing);
      
      handleTransitionEnd(enterTimeout, () => {
        handleSetStatus(ETransactionStatus.ENTERED, () => {
          onEntered?.(appearing);
        });
      });
    });
  }, [durations, enter, onEnter, handleSetStatus, onEntered, onEntering, handleTransitionEnd]);
}
