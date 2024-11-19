import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStartMaxPoint5(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.startCreating({
      pointCountMax: 5
    });
  }, [markingInstance]);
}
