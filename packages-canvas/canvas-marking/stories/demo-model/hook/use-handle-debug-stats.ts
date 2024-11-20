import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleDebugStats(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    console.info(markingInstance?.getStats()); // eslint-disable-line no-console
  }, [markingInstance]);
}
