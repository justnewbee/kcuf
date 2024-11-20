import {
  useCallback
} from 'react';

import useMarkingInstance from './use-marking-instance';

export default function useHandleSetDataEmpty(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.setData('', []);
  }, [markingInstance]);
}
