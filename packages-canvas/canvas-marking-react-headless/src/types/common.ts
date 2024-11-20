import {
  ZoomHow,
  MarkingConfigItem,
  MarkingItemFinder,
  CanvasMarkingStats
} from '@kcuf/canvas-marking';

export interface IImperativeRef {
  startCreating(options?: MarkingConfigItem): void;
  cancelCreating(): void;
  select(finder: MarkingItemFinder<unknown>): void;
  highlight(finder: MarkingItemFinder<unknown>, borderIndex?: number | null): void;
  zoom(how: ZoomHow): void;
  getStats(): CanvasMarkingStats | null;
}
