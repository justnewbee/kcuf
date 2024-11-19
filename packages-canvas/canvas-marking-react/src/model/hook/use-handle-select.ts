import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '@kcuf/canvas-marking';

import useMarkingStage from './use-marking-stage';

export default function useHandleSelect(): (finder: MarkingItemFinder<unknown>) => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((finder: MarkingItemFinder<unknown>): void => {
    markingInstance?.selectItem(finder);
  }, [markingInstance]);
}
