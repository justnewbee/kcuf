import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStartLine(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.startCreating({
      pointStyle: {
        type: 'square'
      },
      pointCountMin: 2,
      pointCountMax: 2
    });
  }, [markingInstance]);
}
