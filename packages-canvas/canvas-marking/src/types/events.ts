import {
  EMarkingStatsChangeCause
} from '../enum';

import {
  IMarkingItemStats,
  IMarkingStageStats
} from './stats';

/**
 * 所有事件
 *
 * 注意：为了便于查找代码，所有 onXx 都不要析构出来，而是保持 options.onXx?.() 的调用方式
 */
export interface IOptionsEvents<T> {
  onCreateStart?(): void;
  onCreateCancel?(): void;
  onCreateComplete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onClick?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onSelectionChange?(stats: IMarkingItemStats<T> | null, statsList: IMarkingItemStats<T>[]): void;
  onPointRemove?(stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]): void;
  onPointInsert?(stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]): void;
  onDragEnd?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onEditCancel?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onEditComplete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onDelete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onZoomChange?(zoomLevel: number, zoomLevelPrev: number): void;
  onMoveStart?(): void;
  onMovePause?(): void;
  onMoveEnd?(): void;
  onStatsChange?(stats: IMarkingStageStats<T>, cause: EMarkingStatsChangeCause): void;
}

export type TSubscribableEvents<T> = { // 这个不要用 interface
  'create-start': [];
  'create-cancel': [];
  'create-complete': [stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]];
  'click': [stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]];
  'selection-change': [stats: IMarkingItemStats<T> | null, statsList: IMarkingItemStats<T>[]];
  'point-remove': [stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]];
  'point-insert': [stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]];
  'drag-end': [stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]];
  'edit-cancel': [stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]];
  'edit-complete': [stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]];
  'delete': [stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]];
  'zoom-change': [zoomLevel: number, zoomLevelPrev: number];
  'move-start': [];
  'move-pause': [];
  'move-end': [];
  'stats-change': [stats: IMarkingStageStats<T>, cause: EMarkingStatsChangeCause];
};