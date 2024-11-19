import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleDeleteActiveItem(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.deleteActiveItem();
  }, [markingInstance]);
}
