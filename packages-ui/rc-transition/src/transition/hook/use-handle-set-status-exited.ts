import {
  useCallback
} from 'react';

import {
  ETransitionStatus
} from '../enum';

import useModelProps from './_use-model-props';
import useDispatchSetStatus from './use-dispatch-set-status';
import useDispatchSetMounted from './use-dispatch-set-mounted';

export default function useHandleSetStatusExited(): () => void {
  const {
    unmountOnExit,
    onExited
  } = useModelProps();
  const dispatchSetMounted = useDispatchSetMounted();
  const dispatchSetStatus = useDispatchSetStatus();
  
  return useCallback(() => {
    dispatchSetStatus(ETransitionStatus.EXITED);
    onExited?.();
    
    if (unmountOnExit) {
      dispatchSetMounted(false);
    }
  }, [unmountOnExit, onExited, dispatchSetMounted, dispatchSetStatus]);
}
