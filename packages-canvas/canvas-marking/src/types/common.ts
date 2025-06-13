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
   * 鼠标位置（屏幕像素，不受缩放影响）：相对于 stage 左上角，不论内外
   */
  coordsRelativeToStage: Point;
  
  /**
   * 鼠标位置（屏幕像素，不受缩放影响）：相对于 canvas 左上角，不论内外
   */
  coordsRelativeToCanvas: Point;
  
  /**
   * 鼠标位置（图片像素，受缩放影响）：相对于 canvas 左上角，不论内外，不受磁吸等矫正
   */
  coordsRelativeToImage: Point;
  
  /**
   * 鼠标位置（屏幕像素，不受缩放影响）：相对于 stage 左上角，为 null 表示在 stage 之外
   */
  coordsInStage: Point | null;
  
  /**
   * 鼠标位置（屏幕像素，不受缩放影响）：相对于 canvas 左上角，为 null 表示在 canvas 之外
   */
  coordsInCanvas: Point | null;
  
  /**
   * 鼠标位置（图片像素，受缩放影响）：相对于 canvas 左上角，且限定在图片内部，受磁吸等矫正，移出后不清空
   */
  coordsInImage: Point;
  
  /**
   * 鼠标矫正方式
   */
  coordsInImageJustified: EMouseJustifyStatus;
}

/**
 * 画布移动信息汇总
 */
export interface IMovingInfo {
  /**
   * 已开始拖拽移动
   */
  started: boolean;
  
  /**
   * 画布移动开始的鼠标位置
   */
  coordsStart: Point | null;
  
  /**
   * 画布移动开始的画布左上角位移快照
   *
   * 鼠标位移（当前鼠标位置 - 开始移动的鼠标位置）+ coordsSnapshot 即移动后的画布左上角位移
   */
  coordsSnapshot: Point;
  
  /**
   * 画布当前的瞬时位移
   */
  coords: Point;
}
