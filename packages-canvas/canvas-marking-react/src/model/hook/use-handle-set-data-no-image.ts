import {
  useCallback
} from 'react';

import {
  DEMO_MARKINGS_NO_IMAGE
} from '../const';

import useMarkingStage from './use-marking-stage';

export default function useHandleSetDataNoImage(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.setData('', DEMO_MARKINGS_NO_IMAGE);
  }, [markingInstance]);
}
