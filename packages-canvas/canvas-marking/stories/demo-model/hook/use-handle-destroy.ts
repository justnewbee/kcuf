import {
  useCallback
} from 'react';

import useModelState from './_use-model-state';
import useDispatchSetMarkingStage from './use-dispatch-set-marking-stage';

export default function useHandleDestroy(): () => void {
  const {
    markingStage
  } = useModelState();
  const dispatchSetMarkingStage = useDispatchSetMarkingStage();
  
  return useCallback(() => {
    if (markingStage) {
      markingStage.destroy();
      dispatchSetMarkingStage(null);
    }
  }, [markingStage, dispatchSetMarkingStage]);
}
