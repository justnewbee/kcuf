import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingCancel(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.cancelCreating();
  }, [markingStage]);
}
