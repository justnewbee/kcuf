import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleSetDataEmpty(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.setData('', []);
  }, [markingInstance]);
}
