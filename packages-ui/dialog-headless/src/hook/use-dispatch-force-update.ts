import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchForceUpdate(): () => void {
  const dispatch = useModelDispatch();
  
  return () => dispatch({
    type: EAction.FORCE_UPDATE
  });
}
