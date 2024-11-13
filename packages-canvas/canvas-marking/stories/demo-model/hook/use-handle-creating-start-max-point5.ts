import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStartMaxPoint5(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.startCreating({
      pointCountMax: 5
    });
  }, [markingStage]);
}
