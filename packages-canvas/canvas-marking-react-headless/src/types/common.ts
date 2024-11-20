import {
  ZoomHow,
  MarkingConfigItem,
  MarkingItemFinder,
  CanvasMarkingStats
} from '@kcuf/canvas-marking';

export interface IImperativeRef<T = unknown> {
  startCreating(options?: MarkingConfigItem<T>): void;
  cancelCreating(): void;
  select(finder: MarkingItemFinder<T>): void;
  highlight(finder: MarkingItemFinder<T>, borderIndex?: number | null): void;
  zoom(how: ZoomHow): void;
  getStats(): CanvasMarkingStats<T> | null;
}
