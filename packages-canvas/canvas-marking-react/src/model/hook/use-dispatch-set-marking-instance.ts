import {
  useCallback
} from 'react';

import {
  MarkingStageClassType
} from '@kcuf/canvas-marking';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMarkingInstance(): (payload: MarkingStageClassType | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: MarkingStageClassType | null) => dispatch({
    type: EAction.SET_MARKING_INSTANCE,
    payload
  }), [dispatch]);
}
