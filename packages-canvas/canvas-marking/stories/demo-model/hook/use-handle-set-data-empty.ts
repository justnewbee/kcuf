import {
  useCallback
} from 'react';

import useMarkingStage from './use-marking-stage';

export default function useHandleSetDataEmpty(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.setData('', []);
  }, [markingStage]);
}
