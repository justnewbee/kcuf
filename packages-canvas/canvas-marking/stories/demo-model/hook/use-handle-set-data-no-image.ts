import {
  useCallback
} from 'react';

import {
  DEMO_MARKINGS_NO_IMAGE
} from '../const';

import useMarkingStage from './use-marking-stage';

export default function useHandleSetDataNoImage(): () => void {
  const markingStage = useMarkingStage();
  
  return useCallback((): void => {
    markingStage?.setData('', DEMO_MARKINGS_NO_IMAGE);
  }, [markingStage]);
}