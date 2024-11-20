import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreatingFinish(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.finishCreating();
  }, [markingInstance]);
}
