import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '@kcuf/canvas-marking';

import useMarkingInstance from './use-marking-instance';

export default function useHandleSelect(): (finder: MarkingItemFinder<unknown>) => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((finder: MarkingItemFinder<unknown>): void => {
    markingInstance?.selectItem(finder);
  }, [markingInstance]);
}
