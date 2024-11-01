import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStartLine(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.startCreating({
      pointStyle: {
        type: 'square'
      },
      pointCountMin: 2,
      pointCountMax: 2
    });
  }, [markingStage]);
}