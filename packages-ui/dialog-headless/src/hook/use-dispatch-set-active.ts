import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetActive(): (payload: boolean) => void {
  const dispatch = useModelDispatch();
  
  return (payload: boolean) => dispatch({
    type: EAction.SET_ACTIVE,
    payload
  });
}
