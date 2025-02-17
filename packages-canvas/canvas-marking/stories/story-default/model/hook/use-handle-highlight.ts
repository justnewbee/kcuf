import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '../../../../src';

import useMarkingInstance from './use-marking-instance';

export default function useHandleHighlight(): (finder: MarkingItemFinder<unknown>, borderIndex?: number) => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((finder: MarkingItemFinder<unknown>, borderIndex?: number): void => {
    markingInstance?.highlight(finder, borderIndex);
  }, [markingInstance]);
}
