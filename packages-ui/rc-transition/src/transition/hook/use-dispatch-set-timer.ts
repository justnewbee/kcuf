import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetTimer(): (payload: ReturnType<typeof setTimeout> | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: ReturnType<typeof setTimeout> | null) => dispatch({
    type: EAction.SET_TIMER,
    payload
  }), [dispatch]);
}
