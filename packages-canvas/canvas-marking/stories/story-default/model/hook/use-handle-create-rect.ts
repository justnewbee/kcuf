import {
  useCallback
} from 'react';

import {
  CREATE_CONFIG_RECT
} from '../const';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreateRect(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating(CREATE_CONFIG_RECT);
  }, [markingInstance]);
}
