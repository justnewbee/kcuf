import {
  useCallback
} from 'react';

import {
  ETransactionStatus
} from '../enum';
import {
  forceReflow
} from '../../util';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
import useDispatchSetStatus from './use-dispatch-set-status';
import useHandlePerformEnter from './use-handle-perform-enter';
import useHandlePerformExit from './use-handle-perform-exit';
import useHandleCancelNextCallback from './use-handle-cancel-next-callback';

export default function useHandleUpdateStatus(): (mounting?: boolean, nextStatus?: ETransactionStatus | null) => void {
  const {
    nodeRef,
    unmountOnExit,
    mountOnEnter
  } = useModelProps();
  const {
    status
  } = useModelState();
  const dispatchSetStatus = useDispatchSetStatus();
  const handleCancelNextCallback = useHandleCancelNextCallback();
  const handlePerformEnter = useHandlePerformEnter();
  const handlePerformExit = useHandlePerformExit();
  
  return useCallback((mounting = false, nextStatus?: ETransactionStatus | null) => {
    if (nextStatus !== null) {
      handleCancelNextCallback();
      
      if (nextStatus === ETransactionStatus.ENTERING) {
        if (unmountOnExit || mountOnEnter) {
          const node = nodeRef.current;
          
          if (node) {
            forceReflow(node);
          }
        }
        
        handlePerformEnter(mounting);
      } else {
        handlePerformExit();
      }
    } else if (unmountOnExit && status === ETransactionStatus.EXITED) {
      dispatchSetStatus(ETransactionStatus.UNMOUNTED);
    }
  }, [unmountOnExit, status, handleCancelNextCallback, mountOnEnter, handlePerformEnter, nodeRef, handlePerformExit, dispatchSetStatus]);
}
