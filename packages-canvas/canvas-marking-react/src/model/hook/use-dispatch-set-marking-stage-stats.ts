import {
  useCallback
} from 'react';

import {
  MarkingStageStats
} from '@kcuf/canvas-marking';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMarkingStageStats(): (payload: MarkingStageStats | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: MarkingStageStats | null) => dispatch({
    type: EAction.SET_MARKING_STAGE_STATS,
    payload
  }), [dispatch]);
}
