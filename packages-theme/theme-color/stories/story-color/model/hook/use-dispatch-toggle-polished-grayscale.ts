import {
  useCallback
} from 'react';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchTogglePolishedGrayscale(): () => void {
  const dispatch = useModelDispatch();
  
  return useCallback(() => dispatch({
    type: EAction.TOGGLE_POLISHED_GRAYSCALE
  }), [dispatch]);
}
