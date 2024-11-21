import {
  useMemo
} from 'react';

import {
  ZoomHow,
  CanvasMarkingStats,
  MarkingConfigItem,
  MarkingItemFinder
} from '@kcuf/canvas-marking';

import {
  IImperativeRef
} from '../types';

import useMarkingInstance from './use-marking-instance';

export default function useImperativeRef(): IImperativeRef {
  const markingInstance = useMarkingInstance();
  
  return useMemo((): IImperativeRef => ({
    startCreating(options?: MarkingConfigItem): void {
      markingInstance?.startCreating(options);
    },
    cancelCreating(): void {
      markingInstance?.cancelCreating();
    },
    select(finder: MarkingItemFinder): void {
      markingInstance?.selectItem(finder);
    },
    highlight(finder: MarkingItemFinder, borderIndex?: number | null): void {
      markingInstance?.highlightItem(finder, borderIndex);
    },
    zoom(how: ZoomHow): void {
      markingInstance?.zoom(how);
    },
    getStats(): CanvasMarkingStats | null {
      return markingInstance ? markingInstance.getStats() : null;
    }
  }), [markingInstance]);
}