import {
  Point
} from '@kcuf/geometry-basic';

import {
  EMarkingStatsChangeCause
} from '../enum';

import {
  IMarkingStats,
  IMarkingItemStats
} from './stats';
import {
  ICreateCompletePreResult,
  IEditDragEndPreResult
} from './common';

/**
 * 所有事件，及钩子方法
 *
 * 注意：为了便于查找代码，所有 onXx 都不要析构出来，而是保持 options.onXx?.() 的调用方式
 */
export interface IMarkingEvents<T> {
  onImageLoadStart?(imageUrl: string): void;
  onImageLoadSuccess?(imageUrl: string, size: [number, number], duration: number): void;
  onImageLoadError?(imageUrl: string, duration: number): void;
  onCreateStart?(): void;
  onCreateCancel?(): void;
  /**
   * `onCreateComplete` 前置回调，可用于修改 path 或填入 data，返回 false 表示拒绝此次新建
   */
  onCreateCompletePre?(itemStats: IMarkingItemStats<T>, markingStats: IMarkingStats<T>): ICreateCompletePreResult<T> | false | undefined | Promise<ICreateCompletePreResult<T> | false | undefined>;
  onCreateComplete?(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  onClick?(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  onSelectionChange?(itemStats: IMarkingItemStats<T> | null, itemStatsList: IMarkingItemStats<T>[]): void;
  /**
   * `onPointPush` 前置回调，返回 false 表示拒绝 push
   */
  onPointPushPre?(point: Point, itemStats: IMarkingItemStats<T>, markingStats: IMarkingStats<T>): boolean | undefined;
  onPointPush?(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  onPointInsert?(itemStats: IMarkingItemStats<T>, index: number, itemStatsList: IMarkingItemStats<T>[]): void;
  onPointDelete?(itemStats: IMarkingItemStats<T>, index: number, itemStatsList: IMarkingItemStats<T>[]): void;
  /**
   * `onEditDragEnd` 前置回调，可用于修改 path 或填入 data，返回 false 则表示拒绝此次编辑（还原）
   */
  onEditDragEndPre?(itemStats: IMarkingItemStats<T>, markingStats: IMarkingStats<T>): IEditDragEndPreResult<T> | false | undefined;
  onEditDragEnd?(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  onEditCancel?(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  onEditComplete?(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  onDelete?(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  onZoomChange?(zoomLevel: number, zoomLevelPrev: number): void;
  onMoveReady?(): void;
  onMoveStart?(): void;
  onMovePause?(): void;
  onMoveEnd?(): void;
  onStatsChange?(stats: IMarkingStats<T>, cause: EMarkingStatsChangeCause): void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TSubscribableEvents<T = unknown> = { // 这个不用 interface
  'image-load-start'?(imageUrl: string): void;
  'image-load-success'?(imageUrl: string, size: [number, number], duration: number): void;
  'image-load-error'?(imageUrl: string, duration: number): void;
  'create-start'(): void;
  'create-cancel'(): void;
  'create-complete'(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  click(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  'selection-change'(itemStats: IMarkingItemStats<T> | null, itemStatsList: IMarkingItemStats<T>[]): void;
  'point-push'(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  'point-insert'(itemStats: IMarkingItemStats<T>, index: number, itemStatsList: IMarkingItemStats<T>[]): void;
  'point-delete'(itemStats: IMarkingItemStats<T>, index: number, itemStatsList: IMarkingItemStats<T>[]): void;
  'edit-drag-end'(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  'edit-cancel'(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  'edit-complete'(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  delete(itemStats: IMarkingItemStats<T>, itemStatsList: IMarkingItemStats<T>[]): void;
  'zoom-change'(zoomLevel: number, zoomLevelPrev: number): void;
  'move-ready'(): void;
  'move-start'(): void;
  'move-pause'(): void;
  'move-end'(): void;
  'stats-change'(stats: IMarkingStats<T>, cause: EMarkingStatsChangeCause): void;
};
