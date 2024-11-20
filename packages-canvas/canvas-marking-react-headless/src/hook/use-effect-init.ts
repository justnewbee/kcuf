import {
  useEffect
} from 'react';

import CanvasMarking from '@kcuf/canvas-marking';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
import useDispatchSetMarkingInstance from './use-dispatch-set-marking-instance';

export default function useEffectInit(): void {
  const {
    zoomOptions,
    tooltipOptions
  } = useModelProps();
  const {
    domContainer,
    markingInstance
  } = useModelState();
  const dispatchSetCanvasMarking = useDispatchSetMarkingInstance();
  
  useEffect(() => {
    if (!domContainer || markingInstance) {
      return;
    }
    
    const instance = new CanvasMarking(domContainer, {
      zoomOptions,
      tooltipOptions
    });
    
    dispatchSetCanvasMarking(instance);
  }, [domContainer, markingInstance, zoomOptions, tooltipOptions, dispatchSetCanvasMarking]);
}
