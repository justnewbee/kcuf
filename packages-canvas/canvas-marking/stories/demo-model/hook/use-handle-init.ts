import {
  useCallback
} from 'react';

import Marking from '../../../src';
import {
  DEMO_MARKINGS_AERIAL,
  IMAGE_AERIAL
} from '../const';
import {
  generateCallback,
  getHoveringInfo
} from '../util';

import useModelState from './_use-model-state';
import useDispatchSetMarkingStage from './use-dispatch-set-marking-stage';
import useDispatchSetMarkingStageStats from './use-dispatch-set-marking-stage-stats';

export default function useHandleInit(): () => void {
  const {
    domMarking,
    markingStage
  } = useModelState();
  const dispatchSetMarkingStage = useDispatchSetMarkingStage();
  const dispatchSetMarkingStageStats = useDispatchSetMarkingStageStats();
  
  return useCallback(() => {
    if (domMarking && !markingStage) {
      dispatchSetMarkingStage(new Marking(domMarking, {
        image: IMAGE_AERIAL,
        items: DEMO_MARKINGS_AERIAL,
        pluginFps: true,
        pluginStats: true,
        pluginTooltip: {
          getHoveringInfo
        },
        onCreateStart: generateCallback('onCreateStart'),
        onCreateCancel: generateCallback('onCreateCancel'),
        onCreateComplete: generateCallback('onCreateComplete'),
        onClick: generateCallback('onClick'),
        onSelectionChange: generateCallback('onSelectionChange'),
        onPointInsert: generateCallback('onPointInsert'),
        onDragEnd: generateCallback('onDragEnd'),
        onEditCancel: generateCallback('onEditCancel'),
        onEditComplete: generateCallback('onEditComplete'),
        onDelete: generateCallback('onDelete'),
        onStatsChange: dispatchSetMarkingStageStats
      }));
    }
  }, [domMarking, markingStage, dispatchSetMarkingStage, dispatchSetMarkingStageStats]);
}