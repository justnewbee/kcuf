import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleDeleteSelectedItem(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.deleteItemEditing();
  }, [markingInstance]);
}
