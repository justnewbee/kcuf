import {
  useCallback
} from 'react';

import {
  MarkingStats
} from '../../../../src';
import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMarkingStats(): (payload: MarkingStats | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: MarkingStats | null) => dispatch({
    type: EAction.SET_MARKING_STATS,
    payload
  }), [dispatch]);
}
