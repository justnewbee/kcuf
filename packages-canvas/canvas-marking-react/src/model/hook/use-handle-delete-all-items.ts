import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleDeleteAllItems(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.deleteAllItems();
  }, [markingInstance]);
}
