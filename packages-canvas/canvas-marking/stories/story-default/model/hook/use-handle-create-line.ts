import {
  useCallback
} from 'react';

import {
  CREATE_CONFIG_LINE
} from '../const';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreateLine(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating(CREATE_CONFIG_LINE);
  }, [markingInstance]);
}
