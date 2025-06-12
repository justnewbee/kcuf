import {
  Point,
  Path
} from '@kcuf/geometry-basic';

import {
  EImageStatus, EMouseJustifyStatus,
  EZoomHow
} from '../enum';

export type TSize = [number, number]; // 大小 [width, height]

export type TCreatingWillFinish = boolean | 'close';

/**
 * 对外提供的查找 `MarkingItem` 的方式
 *
 * - `null`
 * - `'first'` 第一个
 * - `'last'` 最末一个
 * - `number` 向前（复数）或向后
 * - `string` 根据 `id` 查找
 * - `(id: string, data?: T) => boolean` 更细节的查找
 */
export type TMarkingItemFinder<T = unknown> = null | 'first' | 'last' | string | number | ((id: string, data?: T) => boolean);

export type TZoomArg = EZoomHow | `${EZoomHow}`;

export interface ICreateCompletePreResult<T = unknown> {
  path?: Path;
  data?: T;
}

export interface IEditDragEndPreResult<T = unknown> {
  path?: Path;
  data?: T;
}

export interface ISimpleRect {
  coords: [number, number];
  size: [number, number];
}

/**
 * 图片信息汇总
 */
export interface IImageInfo {
  url: string;
  status: EImageStatus;
  size: TSize;
  scale: number;
  loader: HTMLImageElement | null;
}

/**
 * 鼠标信息汇总
 */
export interface IMouseInfo {
  /**
   * 鼠标相对于 stage 和 canvas 的坐标是根据 mouse 实时计算的，但仍然需要记录鼠标是否已进入 stage，原因如下：
   *
   * 1. 初始化的时候，鼠标在 stage 内，尚未移动，需监听 `stage` 的 `mouseenter` 事件以第一时间感知鼠标位置
   * 2. Cmd Tab 导致 leave/enter 状态切换
   */
  inStage: boolean;
  
  /**
   * 鼠标在 canvas 内部按下
   */
  downCanvas: boolean;
  
  /**
   * 鼠标在 canvas 内部按下后拖移中
   */
  downMoving: boolean;
  
  /**
   * 鼠标位置（屏幕像素）：相对于 stage 左上角，不论内外（因此可能有负值）
   */
  coordsRelativeToStage: Point;
  
  /**
   * 相对于 canvas 的鼠标位置，可能有负
   */
  coordsRelativeToCanvas: Point;
  
  /**
   * 鼠标位置（屏幕像素）：相对于 stage 左上角，不论内外（因此可能有负值）
   */
  coordsInStage: Point | null;
  
  /**
   * 相对于 canvas 的鼠标位置，为 null 表示在 canvas 之外
   */
  coordsInCanvas: Point | null;
  
  /**
   * 相对于图片的鼠标位置（跟缩放有关），这个坐标计算相对复杂，且会被 Item 对象读取（故为 public）
   *
   *
   * 鼠标相对于图片的坐标，鼠标移出后不会清空
   *
   */
  coordsInImage: Point;
  
  /**
   * 鼠标矫正状态
   */
  coordsInImageJustified: EMouseJustifyStatus;
}
