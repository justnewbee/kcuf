import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingFinish(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.finishCreating();
  }, [markingInstance]);
}
