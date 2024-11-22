import {
  ZoomArg,
  MarkingConfigItem,
  MarkingItemFinder,
  CanvasMarkingStats
} from '@kcuf/canvas-marking';

export interface IImperativeRef<T = unknown> {
  startCreating(options?: MarkingConfigItem<T>): void;
  cancelCreating(): void;
  select(finder: MarkingItemFinder<T>): void;
  highlight(finder: MarkingItemFinder<T>, borderIndex?: number | null): void;
  zoom(how: ZoomArg): void;
  getStats(): CanvasMarkingStats<T> | null;
}

// 插件开关，除了说明的默认开
export interface IPlugins {
  cursor?: boolean;
  tooltip?: boolean;
  magnet?: boolean;
  snapping?: boolean;
  zoom?: boolean;
  move?: boolean;
  stats?: boolean; // 默认 false
  fps?: boolean; // 默认 false
}
