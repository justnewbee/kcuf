import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '../../../src';

import useMarkingStage from './use-marking-stage';

export default function useHandleHighlight(): (finder: MarkingItemFinder<unknown>, borderIndex?: number) => void {
  const markingStage = useMarkingStage();
  
  return useCallback((finder: MarkingItemFinder<unknown>, borderIndex?: number): void => {
    markingStage?.highlightItem(finder, borderIndex);
  }, [markingStage]);
}
