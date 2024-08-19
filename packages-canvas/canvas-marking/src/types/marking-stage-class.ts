import {
  Point
} from '@kcuf/geometry-basic';

import {
  TMarkingItemFinder,
  TSize
} from './common';
import {
  IMarkingItemStats,
  IMarkingStageStats
} from './stats';
import {
  IMarkingItemClass,
  IMarkingConfigItem
} from './marking-item-class';
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
  
  getItemStatsList(exclude?: IMarkingItemClass<T>): IMarkingItemStats<T>[];
}

/**
 * MarkingStage 需实现的接口
 */
export interface IMarkingStageClass<T = void> extends IMarkingStageClassProtected<T> {
  readonly stage: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  
  /**
   * 设置图片（用空串可清空）和数据
   */
  setData(url: string, markings?: IMarkingConfigItem<T>[]): void;
  
  toggleDisabled(disabled?: boolean): void;
  
  toggleMagnet(magnet?: boolean): void;
  
  startCreating(extraOptions?: IMarkingConfigItem<T>): void;
  
  cancelCreating(): void;
  
  finishCreating(): void;
  
  // private startEditing(o): void;
  
  finishEditing(): void;
  
  highlightItem(finder: TMarkingItemFinder<T> | null, borderIndex?: number | null): void;
  
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
   * 销毁
   */
  destroy(): void;
}