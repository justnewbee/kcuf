import {
  useCallback
} from 'react';

import {
  MarkingConfigItem
} from '@kcuf/canvas-marking';

import useMarkingInstance from './use-marking-instance';

export default function useHandleStartCreating(): (options?: MarkingConfigItem) => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((options?: MarkingConfigItem): void => {
    markingInstance?.startCreating(options);
  }, [markingInstance]);
}
