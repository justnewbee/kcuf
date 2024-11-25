import {
  EMarkingStatsChangeCause
} from '../enum';

import {
  IMarkingItemStats,
  ICanvasMarkingStats
} from './stats';
import {
  TOnBeforeCreateComplete,
  TOnBeforeEditDragEnd
} from './common';

/**
 * 所有事件，及钩子方法
 *
 * 注意：为了便于查找代码，所有 onXx 都不要析构出来，而是保持 options.onXx?.() 的调用方式
 */
export interface IMarkingEvents<T> {
  onCreateStart?(): void;
  onCreateCancel?(): void;
  onBeforeCreateComplete?: TOnBeforeCreateComplete<T>;
  onCreateComplete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onClick?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onSelectionChange?(stats: IMarkingItemStats<T> | null, statsList: IMarkingItemStats<T>[]): void;
  onPointRemove?(stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]): void;
  onPointInsert?(stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]): void;
  onBeforeEditDragEnd?: TOnBeforeEditDragEnd<T>;
  onEditDragEnd?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onEditCancel?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onEditComplete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onDelete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onZoomChange?(zoomLevel: number, zoomLevelPrev: number): void;
  onMoveStart?(): void;
  onMovePause?(): void;
  onMoveEnd?(): void;
  onStatsChange?(stats: ICanvasMarkingStats<T>, cause: EMarkingStatsChangeCause): void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TSubscribableEvents<T> = { // 这个不用 interface
  'create-start'(): void;
  'create-cancel'(): void;
  'create-complete'(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  click(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  'selection-change'(stats: IMarkingItemStats<T> | null, statsList: IMarkingItemStats<T>[]): void;
  'point-remove'(stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]): void;
  'point-insert'(stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]): void;
  'drag-end'(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  'edit-cancel'(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  'edit-complete'(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  delete(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  'zoom-change'(zoomLevel: number, zoomLevelPrev: number): void;
  'move-start'(): void;
  'move-pause'(): void;
  'move-end'(): void;
  'stats-change'(stats: ICanvasMarkingStats<T>, cause: EMarkingStatsChangeCause): void;
};
