import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleZoomOut(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.zoomOut();
  }, [markingInstance]);
}
