import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';
import {
  IKeyboardModifiers
} from '../types';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchUpdateActiveModifiers(): (payload: IKeyboardModifiers) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: IKeyboardModifiers) => dispatch({
    type: EAction.UPDATE_ACTIVE_MODIFIERS,
    payload
  }), [dispatch]);
}
