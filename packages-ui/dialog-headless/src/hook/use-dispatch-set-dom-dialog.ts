import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetDomDialog(): (payload: HTMLDivElement | null) => void {
  const dispatch = useModelDispatch();
  
  return (payload: HTMLDivElement | null) => dispatch({
    type: EAction.SET_DOM_DIALOG,
    payload
  });
}
