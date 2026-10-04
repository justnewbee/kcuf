import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetValue(): (payload: string) => void {
  const dispatch = useModelDispatch();
  
  return (payload: string): void => dispatch({
    type: EAction.SET_VALUE,
    payload
  });
}
