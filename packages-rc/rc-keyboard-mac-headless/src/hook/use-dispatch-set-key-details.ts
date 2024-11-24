import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';
import {
  IKeyDetails
} from '../types';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetKeyDetails(): (payload: IKeyDetails | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: IKeyDetails | null) => dispatch({
    type: EAction.SET_KEY_DETAILS,
    payload
  }), [dispatch]);
}
