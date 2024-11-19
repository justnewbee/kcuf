import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleZoomIn(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.zoomIn();
  }, [markingInstance]);
}
