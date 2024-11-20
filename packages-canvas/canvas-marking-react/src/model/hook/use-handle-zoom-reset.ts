import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleZoomReset(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.zoomReset();
  }, [markingInstance]);
}
