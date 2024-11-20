import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '@kcuf/canvas-marking';

import useMarkingInstance from './use-marking-instance';

export default function useHandleHighlight(): (finder: MarkingItemFinder<unknown>, borderIndex?: number) => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((finder: MarkingItemFinder<unknown>, borderIndex?: number): void => {
    markingInstance?.highlightItem(finder, borderIndex);
  }, [markingInstance]);
}
