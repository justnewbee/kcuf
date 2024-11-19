import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleToggleDisabled(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.toggleDisabled();
  }, [markingInstance]);
}
