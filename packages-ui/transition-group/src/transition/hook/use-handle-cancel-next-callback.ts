import {
  useCallback
} from 'react';

import useRefNextCallback from './use-ref-next-callback';

export default function useHandleCancelNextCallback(): () => void {
  const refNextCallback = useRefNextCallback();
  
  return useCallback(() => {
    if (refNextCallback.current !== null) {
      refNextCallback.current();
      refNextCallback.current = null;
    }
  }, [refNextCallback]);
}
