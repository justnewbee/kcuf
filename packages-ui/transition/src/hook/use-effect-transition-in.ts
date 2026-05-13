import {
  useEffect
} from 'react';

import {
  ETransitionStatus
} from '../enum';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
import useHandleTransitionEnter from './use-handle-transition-enter';

export default function useEffectTransitionIn(): void {
  const {
    in: inProp
  } = useModelProps();
  const {
    mounted,
    status,
    timer
  } = useModelState();
  const handleTransitionIn = useHandleTransitionEnter();
  
  useEffect(() => {
    if (!inProp || !mounted || status === ETransitionStatus.ENTERING || status === ETransitionStatus.ENTERED) {
      return;
    }
    
    if (timer) {
      clearTimeout(timer);
    }
    
    handleTransitionIn();
  }, [inProp, mounted, status, timer, handleTransitionIn]);
}
