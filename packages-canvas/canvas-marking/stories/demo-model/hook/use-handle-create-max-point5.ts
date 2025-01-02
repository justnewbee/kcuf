import {
  useCallback
} from 'react';

import {
  CREATE_CONFIG_POINT5
} from '../const';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreateMaxPoint5(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating(CREATE_CONFIG_POINT5);
  }, [markingInstance]);
}
