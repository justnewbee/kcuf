import {
  useCallback
} from 'react';

import {
  ETransitionStatus
} from '../enum';

import useModelProps from './_use-model-props';
import useDispatchSetStatus from './use-dispatch-set-status';

export default function useHandleSetStatusExiting(): () => void {
  const {
    onExit
  } = useModelProps();
  const dispatchSetStatus = useDispatchSetStatus();
  
  return useCallback(() => {
    dispatchSetStatus(ETransitionStatus.EXITING);
    onExit?.();
  }, [onExit, dispatchSetStatus]);
}
