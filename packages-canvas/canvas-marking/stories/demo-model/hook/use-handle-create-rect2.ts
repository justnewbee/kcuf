import {
  useCallback
} from 'react';

import {
  CREATE_CONFIG_RECT2
} from '../const';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreateRect2(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating(CREATE_CONFIG_RECT2);
  }, [markingInstance]);
}
