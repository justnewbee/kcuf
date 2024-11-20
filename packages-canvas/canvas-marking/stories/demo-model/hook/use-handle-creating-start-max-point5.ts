import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreatingStartMaxPoint5(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating({
      pointCountMax: 5
    });
  }, [markingInstance]);
}
