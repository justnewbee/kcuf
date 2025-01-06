import {
  useCallback
} from 'react';

import {
  EAction,
  ETransactionStatus
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetStatus(): (payload: ETransactionStatus) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: ETransactionStatus) => dispatch({
    type: EAction.SET_STATUS,
    payload
  }), [dispatch]);
}
