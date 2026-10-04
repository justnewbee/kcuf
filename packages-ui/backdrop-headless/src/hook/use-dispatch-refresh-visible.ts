import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchRefreshVisible(): (payload: number) => void {
  const dispatch = useModelDispatch();
  
  return (payload: number) => dispatch({
    type: EAction.REFRESH_VISIBLE,
    payload
  });
}
