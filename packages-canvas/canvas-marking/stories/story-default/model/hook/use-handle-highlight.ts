import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '../../../../src';

import useMarkingInstance from './use-marking-instance';

export default function useHandleHighlight(): (finder: MarkingItemFinder, borderIndex?: number) => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((finder: MarkingItemFinder, borderIndex?: number): void => {
    markingInstance?.highlight(finder, borderIndex);
  }, [markingInstance]);
}
