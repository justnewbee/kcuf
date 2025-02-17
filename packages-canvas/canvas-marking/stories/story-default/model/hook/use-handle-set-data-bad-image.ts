import {
  useCallback
} from 'react';

import {
  DEMO_MARKINGS_BAD_IMAGE,
  IMAGE_BAD
} from '../const';

import useMarkingInstance from './use-marking-instance';

export default function useHandleSetDataBadImage(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.setData(IMAGE_BAD, DEMO_MARKINGS_BAD_IMAGE);
  }, [markingInstance]);
}
