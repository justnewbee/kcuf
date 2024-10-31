import {
  useCallback
} from 'react';

import {
  EAction,
  EKeyboardCode
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchPullActiveCode(): (payload: EKeyboardCode) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: EKeyboardCode) => dispatch({
    type: EAction.PULL_ACTIVE_CODE,
    payload
  }), [dispatch]);
}
