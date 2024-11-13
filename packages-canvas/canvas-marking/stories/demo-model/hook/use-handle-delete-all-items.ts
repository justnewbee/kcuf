import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleDeleteAllItems(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.deleteAllItems();
  }, [markingStage]);
}
