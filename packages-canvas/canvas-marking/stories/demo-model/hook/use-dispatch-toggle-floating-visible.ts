import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchToggleFloatingVisible(): (payload?: boolean) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload?: boolean) => dispatch({
    type: EAction.TOGGLE_FLOATING_VISIBLE,
    payload
  }), [dispatch]);
}
