import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchToggleLogEvents(): (payload?: boolean) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload?: boolean) => dispatch({
    type: EAction.TOGGLE_LOG_EVENTS,
    payload
  }), [dispatch]);
}
