import {
  useCallback
} from 'react';

import {
  DEMO_MARKINGS_AERIAL,
  IMAGE_AERIAL
} from '../const';

import useMarkingStage from './use-marking-stage';

export default function useHandleSetDataAerial(): () => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((): void => {
    markingInstance?.setData(IMAGE_AERIAL, DEMO_MARKINGS_AERIAL);
  }, [markingInstance]);
}
