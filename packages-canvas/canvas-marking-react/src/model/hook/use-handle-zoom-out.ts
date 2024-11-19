import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleZoomOut(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.zoomOut();
  }, [markingStage]);
}
