import {
  useCallback
} from 'react';

import {
  ZoomHow
} from '../../../../src';

import useMarkingInstance from './use-marking-instance';

export default function useHandleZoom(): (how: ZoomHow) => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((how: ZoomHow): void => {
    markingInstance?.zoom(how);
  }, [markingInstance]);
}
