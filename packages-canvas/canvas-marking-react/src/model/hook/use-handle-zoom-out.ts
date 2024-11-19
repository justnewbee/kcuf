import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleZoomOut(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.zoomOut();
  }, [markingInstance]);
}
