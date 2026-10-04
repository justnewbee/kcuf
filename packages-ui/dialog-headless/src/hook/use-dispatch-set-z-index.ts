import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';
 
export default function useDispatchSetZIndex(): (payload: number) => void {
  const dispatch = useModelDispatch();
  
  return (payload: number) => dispatch({
    type: EAction.SET_Z_INDEX,
    payload
  });
}
