import {
  EAction,
  ETransitionStatus
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetStatus(): (payload: ETransitionStatus) => void {
  const dispatch = useModelDispatch();
  
  return (payload: ETransitionStatus) => dispatch({
    type: EAction.SET_STATUS,
    payload
  });
}
