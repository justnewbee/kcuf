import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreatingStartLine(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating({
      pointStyle: {
        type: 'square'
      },
      pointCountMin: 2,
      pointCountMax: 2
    });
  }, [markingInstance]);
}
