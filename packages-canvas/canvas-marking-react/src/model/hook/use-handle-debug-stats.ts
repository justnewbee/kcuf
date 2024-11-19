import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleDebugStats(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    console.info(markingInstance?.getStats()); // eslint-disable-line no-console
  }, [markingInstance]);
}
