import {
  useCallback
} from 'react';

import {
  MarkingStageClassType
} from '../../../src';
import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMarkingStage(): (payload: MarkingStageClassType | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: MarkingStageClassType | null) => dispatch({
    type: EAction.SET_MARKING_STAGE,
    payload
  }), [dispatch]);
}
