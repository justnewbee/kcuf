import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';
import {
  IModifierState
} from '../types';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchUpdateModifierState(): (payload: IModifierState) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: IModifierState) => dispatch({
    type: EAction.UPDATE_MODIFIER_STATE,
    payload
  }), [dispatch]);
}
