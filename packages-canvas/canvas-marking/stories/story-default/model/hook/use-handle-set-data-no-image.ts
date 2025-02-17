import {
  useCallback
} from 'react';

import {
  DEMO_MARKINGS_NO_IMAGE
} from '../const';

import useMarkingInstance from './use-marking-instance';

export default function useHandleSetDataNoImage(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.setData('', DEMO_MARKINGS_NO_IMAGE);
  }, [markingInstance]);
}
