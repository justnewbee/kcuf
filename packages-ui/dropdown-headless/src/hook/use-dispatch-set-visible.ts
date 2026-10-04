import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetVisible(): (payload: boolean) => void {
  const dispatch = useModelDispatch();
  
  return (payload: boolean): void => dispatch({
    type: EAction.SET_VISIBLE,
    payload
  });
}
