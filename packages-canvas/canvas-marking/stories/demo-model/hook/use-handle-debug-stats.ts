import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleDebugStats(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    console.info(markingStage?.getStats()); // eslint-disable-line no-console
  }, [markingStage]);
}