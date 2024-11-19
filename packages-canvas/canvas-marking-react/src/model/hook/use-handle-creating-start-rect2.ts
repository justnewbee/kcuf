import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStartRect2(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.startCreating({
      type: 'rect2'
    });
  }, [markingInstance]);
}
