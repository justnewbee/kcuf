import {
  useEffect
} from 'react';

import CanvasMarking from '@kcuf/canvas-marking';

import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';
import useDispatchSetMarkingInstance from './use-dispatch-set-marking-instance';
import useDomRef from './use-dom-ref';

export default function useEffectInit(): void {
  const {
    zoomOptions,
    tooltipOptions
  } = useModelProps();
  const {
    markingInstance
  } = useModelState();
  const domRef = useDomRef();
  const dispatchSetCanvasMarking = useDispatchSetMarkingInstance();
  
  useEffect(() => {
    if (!domRef.current || markingInstance) {
      return;
    }
    
    dispatchSetCanvasMarking(new CanvasMarking(domRef.current, {
      zoomOptions,
      tooltipOptions
    }));
  }, [domRef, markingInstance, zoomOptions, tooltipOptions, dispatchSetCanvasMarking]);
}
