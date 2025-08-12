import {
  useCallback
} from 'react';

import {
  ETransitionStatus
} from '../enum';

import useModelProps from './_use-model-props';
import useDispatchSetStatus from './use-dispatch-set-status';

export default function useHandleSetStatusEntered(): () => void {
  const {
    onEntered
  } = useModelProps();
  const dispatchSetStatus = useDispatchSetStatus();
  
  return useCallback(() => {
    dispatchSetStatus(ETransitionStatus.ENTERED);
    onEntered?.();
  }, [onEntered, dispatchSetStatus]);
}
