import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleDeleteAllItems(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.deleteItemsAll();
  }, [markingInstance]);
}
