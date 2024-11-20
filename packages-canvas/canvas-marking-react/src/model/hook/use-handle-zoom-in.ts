import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleZoomIn(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.zoomIn();
  }, [markingInstance]);
}
