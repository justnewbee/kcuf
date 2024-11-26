import {
  useCallback
} from 'react';

import CanvasMarking from '../../../src';
import {
  DEMO_MARKINGS_AERIAL,
  IMAGE_AERIAL
} from '../const';
import {
  getHoveringInfo
} from '../util';

import useModelState from './_use-model-state';
import useDispatchSetEverInit from './use-dispatch-set-ever-init';
import useDispatchSetCanvasMarking from './use-dispatch-set-marking-instance';
import useDispatchSetMarkingStats from './use-dispatch-set-marking-stats';

export default function useInit(): () => void {
  const {
    domMarking,
    markingInstance
  } = useModelState();
  const dispatchSetEverInit = useDispatchSetEverInit();
  const dispatchSetCanvasMarking = useDispatchSetCanvasMarking();
  const dispatchSetCanvasMarkingStats = useDispatchSetMarkingStats();
  
  return useCallback(() => {
    if (domMarking && !markingInstance) {
      dispatchSetEverInit();
      
      dispatchSetCanvasMarking(new CanvasMarking(domMarking, {
        image: IMAGE_AERIAL,
        markings: DEMO_MARKINGS_AERIAL,
        tooltipOptions: {
          getHoveringInfo
        },
        // onBeforeCreateComplete: () => new Promise<false>(resolve => {
        //   setTimeout(() => resolve(false), 4000);
        // }),
        onStatsChange: dispatchSetCanvasMarkingStats
      }));
    }
  }, [domMarking, markingInstance, dispatchSetEverInit, dispatchSetCanvasMarking, dispatchSetCanvasMarkingStats]);
}
