import {
  EAction,
  EKeyboardCode
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchPushActiveCode(): (payload: EKeyboardCode) => void {
  const dispatch = useModelDispatch();
  
  return (payload: EKeyboardCode) => dispatch({
    type: EAction.PUSH_ACTIVE_CODE,
    payload
  });
}
