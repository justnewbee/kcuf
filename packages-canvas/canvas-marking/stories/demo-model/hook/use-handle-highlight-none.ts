import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleHighlightNone(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.highlightItem(null);
  }, [markingStage]);
}