import {
  useCallback
} from 'react';

import useModelState from './_use-model-state';
import useDispatchSetCanvasMarking from './use-dispatch-set-marking-instance';

export default function useHandleDestroy(): () => void {
  const {
    markingInstance
  } = useModelState();
  const dispatchSetCanvasMarking = useDispatchSetCanvasMarking();
  
  return useCallback(() => {
    if (markingInstance) {
      markingInstance.destroy();
      dispatchSetCanvasMarking(null);
    }
  }, [markingInstance, dispatchSetCanvasMarking]);
}
