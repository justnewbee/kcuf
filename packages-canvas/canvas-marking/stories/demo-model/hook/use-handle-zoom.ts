import {
  useCallback
} from 'react';

import {
  ZoomHow
} from '../../../src';

import useMarkingStage from './use-marking-stage';

export default function useHandleZoom(): (how: ZoomHow) => void {
  const markingStage = useMarkingStage();
  
  return useCallback((how: ZoomHow): void => {
    markingStage?.zoom(how);
  }, [markingStage]);
}
