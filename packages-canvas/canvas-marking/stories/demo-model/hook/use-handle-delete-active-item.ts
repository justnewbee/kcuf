import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleDeleteActiveItem(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.deleteActiveItem();
  }, [markingStage]);
}