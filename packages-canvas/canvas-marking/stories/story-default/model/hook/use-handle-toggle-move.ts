import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleToggleMove(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.toggleMove();
  }, [markingInstance]);
}
