import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetDomContainer(): (payload: HTMLDivElement | null) => void {
  const dispatch = useModelDispatch();
  
  return useCallback((payload: HTMLDivElement | null) => dispatch({
    type: EAction.SET_DOM_CONTAINER,
    payload
  }), [dispatch]);
}
