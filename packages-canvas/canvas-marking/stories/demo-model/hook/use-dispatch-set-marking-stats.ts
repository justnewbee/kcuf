import {
  useCallback
} from 'react';

import {
  CanvasMarkingStats
} from '../../../src';
import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMarkingStats(): (payload: CanvasMarkingStats | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: CanvasMarkingStats | null) => dispatch({
    type: EAction.SET_MARKING_STATS,
    payload
  }), [dispatch]);
}