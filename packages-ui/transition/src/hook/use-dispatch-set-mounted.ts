import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMounted(): (payload: boolean) => void {
  const dispatch = useModelDispatch();
  
  return (payload: boolean) => dispatch({
    type: EAction.SET_MOUNTED,
    payload
  });
}
