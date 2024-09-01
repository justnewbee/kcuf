import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleToggleDisabled(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.toggleDisabled();
  }, [markingStage]);
}