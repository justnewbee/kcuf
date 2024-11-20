import {
  useCallback
} from 'react';

import {
  CanvasMarkingClassType
} from '../../../src';
import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMarkingInstance(): (payload: CanvasMarkingClassType | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: CanvasMarkingClassType | null) => dispatch({
    type: EAction.SET_MARKING_INSTANCE,
    payload
  }), [dispatch]);
}
