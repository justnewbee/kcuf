import {
  useEffect
} from 'react';

import CanvasMarking from '@kcuf/canvas-marking';

import {
  getHoveringInfo
} from '../util';

import useModelState from './_use-model-state';
import useDispatchSetMarkingInstance from './use-dispatch-set-marking-instance';

export default function useEffectInit(): void {
  const {
    domContainer,
    markingInstance
  } = useModelState();
  const dispatchSetMarkingStage = useDispatchSetMarkingInstance();
  
  useEffect(() => {
    if (!domContainer || markingInstance) {
      return;
    }
    
    const instance = new CanvasMarking(domContainer, {
      pluginFps: true,
      pluginStats: true,
      pluginTooltip: {
        getHoveringInfo
      }
    });
    
    dispatchSetMarkingStage(instance);
  }, [domContainer, markingInstance, dispatchSetMarkingStage]);
}
