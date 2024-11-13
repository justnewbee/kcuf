import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '../../../src';

import useMarkingStage from './use-marking-stage';

export default function useHandleSelect(): (finder: MarkingItemFinder<unknown>) => void {
  const markingStage = useMarkingStage();
  
  return useCallback((finder: MarkingItemFinder<unknown>): void => {
    markingStage?.selectItem(finder);
  }, [markingStage]);
}
