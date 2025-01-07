import {
  useEffect
} from 'react';

import {
  ETransitionStatus
} from '../enum';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
import useHandleTransitionExit from './use-handle-transition-exit';

export default function useEffectTransitionOut(): void {
  const {
    in: inProp
  } = useModelProps();
  const {
    mounted,
    status,
    timer
  } = useModelState();
  const handleTransitionOut = useHandleTransitionExit();
  
  useEffect(() => {
    if (inProp || !mounted || status === ETransitionStatus.EXITING || status === ETransitionStatus.EXITED) {
      return;
    }
    
    if (timer) {
      clearTimeout(timer);
    }
    
    handleTransitionOut();
  }, [inProp, mounted, status, timer, handleTransitionOut]);
}
