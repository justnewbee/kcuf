import {
  useCallback
} from 'react';

import CanvasMarking from '../../../../src';
import {
  DEMO_MARKINGS_AERIAL,
  IMAGE_URL_AERIAL
} from '../const';
import {
  getHoveringInfo
} from '../util';

import useModelState from './_use-model-state';
import useDomRef from './use-dom-ref';
import useDispatchSetEverInit from './use-dispatch-set-ever-init';
import useDispatchSetCanvasMarking from './use-dispatch-set-marking-instance';
import useDispatchSetMarkingStats from './use-dispatch-set-marking-stats';

export default function useInit(): () => void {
  const {
    markingInstance
  } = useModelState();
  const domRef = useDomRef();
  const dispatchSetEverInit = useDispatchSetEverInit();
  const dispatchSetCanvasMarking = useDispatchSetCanvasMarking();
  const dispatchSetCanvasMarkingStats = useDispatchSetMarkingStats();
  
  return useCallback(() => {
    if (domRef.current && !markingInstance) {
      dispatchSetEverInit();
      
      dispatchSetCanvasMarking(new CanvasMarking(domRef.current, {
        image: IMAGE_URL_AERIAL,
        markings: DEMO_MARKINGS_AERIAL,
        tooltipOptions: {
          getHoveringInfo
        },
        // onCreateCompletePre: () => new Promise<false>(resolve => {
        //   setTimeout(() => resolve(false), 4000);
        // }),
        // onEditDragEndPre: () => false,
        onStatsChange: dispatchSetCanvasMarkingStats
      }));
    }
  }, [domRef, markingInstance, dispatchSetEverInit, dispatchSetCanvasMarking, dispatchSetCanvasMarkingStats]);
}
