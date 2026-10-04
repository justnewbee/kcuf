import {
  CanvasMarkingClassType
} from '@kcuf/canvas-marking';

import {
  EAction
} from '../enum';

import useModelDispatch from './_use-model-dispatch';

export default function useDispatchSetMarkingInstance(): (payload: CanvasMarkingClassType | null) => void {
  const dispatch = useModelDispatch();
  
  return (payload: CanvasMarkingClassType | null) => dispatch({
    type: EAction.SET_MARKING_INSTANCE,
    payload
  });
}
