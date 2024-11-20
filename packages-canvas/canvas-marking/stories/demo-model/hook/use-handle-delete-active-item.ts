import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleDeleteActiveItem(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.deleteActiveItem();
  }, [markingInstance]);
}
