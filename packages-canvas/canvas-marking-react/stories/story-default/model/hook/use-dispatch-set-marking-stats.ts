import {
  useCallback
} from 'react';

import {
  MarkingStats
} from '@kcuf/canvas-marking-react-headless';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMarkingStats(): (payload: MarkingStats) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: MarkingStats) => dispatch({
    type: EAction.SET_MARKING_STATS,
    payload
  }), [dispatch]);
}
