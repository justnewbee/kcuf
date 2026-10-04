import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetDomDropdown(): (payload: HTMLDivElement | null) => void {
  const dispatch = useModelDispatch();
  
  return (payload: HTMLDivElement | null): void => dispatch({
    type: EAction.SET_DOM_DROPDOWN,
    payload
  });
}
