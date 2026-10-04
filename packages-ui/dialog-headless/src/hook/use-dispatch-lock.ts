import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchLock(): (payload?: boolean) => void {
  const dispatch = useModelDispatch();
  
  return (payload?: boolean) => dispatch({
    type: EAction.LOCK,
    payload
  });
}
