import {
  useCallback
} from 'react';

import {
  DEMO_MARKINGS_AERIAL,
  IMAGE_AERIAL
} from '../const';

import useMarkingInstance from './use-marking-instance';

export default function useHandleSetDataAerial(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.setData(IMAGE_AERIAL, DEMO_MARKINGS_AERIAL);
  }, [markingInstance]);
}
