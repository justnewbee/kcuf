import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleZoomIn(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.zoomIn();
  }, [markingStage]);
}
