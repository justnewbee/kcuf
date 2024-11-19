import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStartRect(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.startCreating({
      type: 'rect'
    });
  }, [markingStage]);
}
