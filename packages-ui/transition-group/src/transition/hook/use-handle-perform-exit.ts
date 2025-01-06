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

export default function useHandlePerformExit(): () => void {
  const {
    exit,
    onExit,
    onExiting,
    onExited
  } = useModelProps();
  const durations = useDurations();
  const handleSetStatus = useHandleSetStatus();
  const handleTransitionEnd = useHandleTransitionEnd();
  
  return useCallback(() => {
    if (!exit) {
      handleSetStatus(ETransactionStatus.EXITED, () => {
        onExited?.();
      });
      
      return;
    }
    
    onExit?.();
    
    handleSetStatus(ETransactionStatus.EXITING, () => {
      onExiting?.();
      
      handleTransitionEnd(durations.exit, () => {
        handleSetStatus(ETransactionStatus.EXITED, () => {
          onExited?.();
        });
      });
    });
  }, [exit, durations.exit, onExit, handleSetStatus, onExited, onExiting, handleTransitionEnd]);
}
