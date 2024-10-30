import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetCodes(): (payload: string[]) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: string[]) => dispatch({
    type: EAction.SET_CODES,
    payload
  }), [dispatch]);
}
