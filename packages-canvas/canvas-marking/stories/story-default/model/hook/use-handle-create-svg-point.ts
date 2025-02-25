import {
  useCallback
} from 'react';

import {
  IMAGE_SVG_POINT
} from '../const';

import useMarkingInstance from './use-marking-instance';

export default function useHandleCreateSvgPoint(): () => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((): void => {
    markingInstance?.startCreating({
      styleConfig: {
        point: {
          shape: IMAGE_SVG_POINT,
          radius: 12
        }
      }
    });
  }, [markingInstance]);
}
