import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchUpdateWindowHeight(): () => void {
  const dispatch = useModelDispatch();
  
  return () => dispatch({
    type: EAction.UPDATE_WINDOW_HEIGHT
  });
}
