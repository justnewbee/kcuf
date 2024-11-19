import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '@kcuf/canvas-marking';

import useMarkingStage from './use-marking-stage';

export default function useHandleHighlight(): (finder: MarkingItemFinder<unknown>, borderIndex?: number) => void {
  const markingInstance = useMarkingStage();
  
  return useCallback((finder: MarkingItemFinder<unknown>, borderIndex?: number): void => {
    markingInstance?.highlightItem(finder, borderIndex);
  }, [markingInstance]);
}
