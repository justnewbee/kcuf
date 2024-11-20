import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreatingStartRect2(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating({
      type: 'rect2'
    });
  }, [markingInstance]);
}
