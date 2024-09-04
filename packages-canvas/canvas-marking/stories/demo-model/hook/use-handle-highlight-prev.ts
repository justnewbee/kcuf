import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleHighlightPrev(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.highlightItem(-1);
  }, [markingStage]);
}