import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetXx(): (payload: number) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: number) => dispatch({
    type: EAction.SET_XX,
    payload
  }), [dispatch]);
}
