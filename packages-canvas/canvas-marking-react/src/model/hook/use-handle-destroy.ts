import {
  useCallback
} from 'react';

import useModelState from './_use-model-state';
import useDispatchSetMarkingStage from './use-dispatch-set-marking-stage';

export default function useHandleDestroy(): () => void {
  const {
    markingInstance
  } = useModelState();
  const dispatchSetMarkingStage = useDispatchSetMarkingStage();
  
  return useCallback(() => {
    if (markingInstance) {
      markingInstance.destroy();
      dispatchSetMarkingStage(null);
    }
  }, [markingInstance, dispatchSetMarkingStage]);
}
