import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleToggleDisabled(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.toggleDisabled();
  }, [markingInstance]);
}
