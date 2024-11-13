import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStartRect2(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.startCreating({
      type: 'rect2'
    });
  }, [markingStage]);
}
