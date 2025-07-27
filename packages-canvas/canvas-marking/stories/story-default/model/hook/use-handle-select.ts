import {
  useCallback
} from 'react';

import {
  MarkingItemFinder
} from '../../../../src';

import useMarkingInstance from './use-marking-instance';

export default function useHandleSelect(): (finder: MarkingItemFinder) => void {
  const markingInstance = useMarkingInstance();
  
  return useCallback((finder: MarkingItemFinder): void => {
    markingInstance?.select(finder);
  }, [markingInstance]);
}
