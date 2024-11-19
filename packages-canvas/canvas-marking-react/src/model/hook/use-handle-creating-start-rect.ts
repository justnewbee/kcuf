import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleCreatingStartRect(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.startCreating({
      type: 'rect'
    });
  }, [markingInstance]);
}
