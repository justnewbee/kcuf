import {
  useCallback
} from 'react';

import {
  CanvasMarkingStats
} from '@kcuf/canvas-marking-react-headless';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetStats(): (payload: CanvasMarkingStats) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: CanvasMarkingStats) => dispatch({
    type: EAction.SET_STATS,
    payload
  }), [dispatch]);
}