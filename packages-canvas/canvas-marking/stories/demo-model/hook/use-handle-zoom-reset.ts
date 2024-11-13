import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleZoomReset(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.zoomReset();
  }, [markingStage]);
}
