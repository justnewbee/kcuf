import type Subscribable from '@kcuf/subscribable';
import {
  Point
} from '@kcuf/geometry-basic';

import {
  TSize,
  TMarkingItemFinder
} from './common';
import {
  IMarkingStageStats
} from './stats';
import {
  IMarkingConfigItem
} from './marking-item-class';
import {
  TSubscribableEvents
} from './events';
import {
  IMarkingStageOptions
} from './options';

/**
 * 共享给 MarkingItem 的属性，单独一个类型为避免 Item 越权操作
 */
export interface IMarkingStageClassProtected<T = void> {
  readonly options: IMarkingStageOptions<T>;
  readonly canvasContext: CanvasRenderingContext2D;
  
  /**
   * 图片实际大小，没有图片的时候为 canvas 大小
   */
  imageSize: TSize;
  /**
   * 图片缩放比例，小于 1 则图片展示尺寸比其本身小
   */
  imageScale: number;
  /**
   * 鼠标相对于图片的坐标，鼠标移出后不会清空
   */
  imageMouse: Point;
}

/**
 * MarkingStage 需实现的接口
 */
export interface IMarkingStageClass<T = void> extends IMarkingStageClassProtected<T>, Subscribable<TSubscribableEvents<T>> {
  readonly stage: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  
  /**
   * 设置图片（用空串可清空）和数据
   */
  setData(url: string, markings?: IMarkingConfigItem<T>[]): void;
  
  /**
   * 切换 disabled 状态，处于 disabled 状态时，不可编辑
   */
  toggleDisabled(disabled?: boolean): void;
  
  /**
   * 切换是否自动矫正（磁吸、正交）
   */
  toggleJustify(enabled?: boolean): void;
  
  /**
   * 切换是否 snap
   */
  toggleSnap(enabled?: boolean): void;
  
  /**
   * 开始新建
   */
  startCreating(extraOptions?: IMarkingConfigItem<T>): void;
  
  /**
   * 取消新建
   */
  cancelCreating(): void;
  
  /**
   * 完成新建（但不一定能完成），可能触发 `onEditCancel` 或 `onEditComplete`
   */
  finishCreating(): void;
  
  /**
   * 完成编辑（不一定能完成）
   */
  finishEditing(): void;
  
  /**
   * 选中或取消选中，会触发 `onSelectionChange`，可能
   */
  selectItem(finder: TMarkingItemFinder<T>): void;
  
  /**
   * 高亮或取消高亮
   */
  highlightItem(finder: TMarkingItemFinder<T>, borderIndex?: number | null): void;
  
  /**
   * 删除激活的标记（可用于在新建后删除刚刚新建的那个）
   */
  deleteActiveItem(): boolean;
  
  /**
   * 清除所有标记（包括新建中的，如果有）
   */
  deleteAllItems(): void;
  
  zoomIn(wheel?: boolean): void;
  zoomOut(wheel?: boolean): void;
  zoomMin(): void;
  zoomMax(): void;
  zoomReset(): void;
  
  /**
   * 开启移动（当鼠标在 stage 内时按下空格，并保持按住状态）
   */
  moveReady(): void;
  moveStart(): void;
  moveProcess(): void;
  movePause(): void;
  moveEnd(): void;
  moveTo(coords: Point): void;
  moveBy(dx: number, dy: number): void;
  
  /**
   * 主动获取当前状态，一般不需要主动调用，建议在 options.onStatsChange 监听
   */
  getStats(): IMarkingStageStats<T>;
  
  /**
   * 根据当前 stats 进行绘画，主要用于内部调用；但也可以由使用者按需主动调用，`drawExtra` 仅供外部调用，以于画一些额外的图形
   *
   * `drawExtra` 的 `scale` 参数主要用于画视觉等效的线
   */
  draw(drawExtra?: (canvasContext: CanvasRenderingContext2D, scale: number) => void): void;
  
  /**
   * 销毁
   */
  destroy(): void;
}