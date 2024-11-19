import {
  useCallback
} from 'react';

import CanvasMarking from '@kcuf/canvas-marking';

import {
  DEMO_MARKINGS_AERIAL,
  IMAGE_AERIAL
} from '../const';
import {
  getHoveringInfo
} from '../util';

import useModelState from './_use-model-state';
import useDispatchSetEverInit from './use-dispatch-set-ever-init';
import useDispatchSetMarkingStage from './use-dispatch-set-marking-stage';
import useDispatchSetMarkingStageStats from './use-dispatch-set-marking-stage-stats';

export default function useInit(): () => void {
  const {
    domMarking,
    markingStage
  } = useModelState();
  const dispatchSetEverInit = useDispatchSetEverInit();
  const dispatchSetMarkingStage = useDispatchSetMarkingStage();
  const dispatchSetMarkingStageStats = useDispatchSetMarkingStageStats();
  
  return useCallback(() => {
    if (domMarking && !markingStage) {
      dispatchSetEverInit();
      
      dispatchSetMarkingStage(new CanvasMarking(domMarking, {
        image: IMAGE_AERIAL,
        items: DEMO_MARKINGS_AERIAL,
        pluginFps: true,
        pluginStats: true,
        pluginTooltip: {
          getHoveringInfo
        },
        onStatsChange: dispatchSetMarkingStageStats
      }));
    }
  }, [domMarking, markingStage, dispatchSetEverInit, dispatchSetMarkingStage, dispatchSetMarkingStageStats]);
}
