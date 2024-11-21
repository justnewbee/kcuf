import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';
import {
  TTogglePluginPayload
} from '../types';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchTogglePlugin(): (payload: TTogglePluginPayload) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: TTogglePluginPayload) => dispatch({
    type: EAction.TOGGLE_PLUGIN,
    payload
  }), [dispatch]);
}
