import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingFinish(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.finishCreating();
  }, [markingStage]);
}
