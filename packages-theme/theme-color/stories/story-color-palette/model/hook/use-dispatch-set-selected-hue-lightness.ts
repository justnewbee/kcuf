import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetSelectedHueLightness(): (payload: [number, number]) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: [number, number]) => dispatch({
    type: EAction.SET_SELECTED_HUE_LIGHTNESS,
    payload
  }), [dispatch]);
}
