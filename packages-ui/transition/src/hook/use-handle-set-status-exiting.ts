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
  
  return () => {
    dispatchSetStatus(ETransitionStatus.EXITING);
    onExit?.();
  };
}
