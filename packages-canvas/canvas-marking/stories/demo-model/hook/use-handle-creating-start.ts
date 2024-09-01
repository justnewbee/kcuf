import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStart(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.startCreating();
  }, [markingStage]);
}