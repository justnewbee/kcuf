import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreatingStart(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating();
  }, [markingInstance]);
}
