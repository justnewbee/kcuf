import {
  IMarkingAuxiliaryLine
} from './common';
import {
  TLineJoin,
  TPointType
} from './style';
import {
  IMarkingConfigItem,
  IMarkingItemConfig
} from './canvas-marking-item-class';
import {
  TBeforeHook,
  IOptionsEvents
} from './events';
import {
  IMarkingItemStats
} from './stats';

export interface IMarkingZoomOptions {
  step?: number; // 键盘或点击要快点
  stepWheel?: number; // 滚轮可以顺滑一些
  min?: number;
  max?: number;
}

export interface IMarkingTooltipOptions<T> {
  offsetX?: number;
  offsetY?: number;
  /**
   * 为新建中增加额外信息，避免误操，支持 HTML strong、em 的样式
   */
  getCreatingInfo?(itemStats: IMarkingItemStats<T>): string;
  /**
   * 可以在 hover 某路径的时候，给与更多友好的提示信息，支持 HTML strong、em 的样式
   */
  getHoveringInfo?(itemStats: IMarkingItemStats<T>): string;
}

export interface ICanvasMarkingOptions<T> extends IMarkingItemConfig, IOptionsEvents<T> {
  auxiliaryLine?: IMarkingAuxiliaryLine;
  // --- 数据 --- //
  image?: string;
  imageBgc?: string; // 没有图片的时候填充色（有助于辨别 move 后的边界）
  items?: IMarkingConfigItem<T>[];
  // --- 行为 --- //
  /**
   * 磁吸距离（屏幕像素），当鼠标和任一标注的点或线距离小于此值时进行磁吸
   */
  magnetRadius?: number;
  /**
   * 拖拽的同时，按住某键，可以暂时取消磁吸
   */
  magnetDisableKey?: string;
  /**
   * 双击间隔时间，默认 200ms（这里没用用原生的 dblclick 事件，而是由单击模拟的）
   */
  doubleClickInterval?: number;
  /**
   * 矩形矫正时距离阈值
   */
  justifyPerpendicularThresholdRadius?: number;
  /**
   * 直角标记大小，若临边长度不足此值则不显示
   */
  perpendicularMarkSize?: number;
  // --- 共享给插件的选项 --- //
  zoomOptions?: IMarkingZoomOptions;
  tooltipOptions?: IMarkingTooltipOptions<T>;
  // --- 一些钩子方法 --- //
  beforeCreateComplete?: TBeforeHook<T>; // 新建结束前，自动调整路径
  beforeEditDragEnd?: TBeforeHook<T>; // 编辑拖拽结束前，自动调整路径
}

export interface IDrawBorderOptions {
  scale: number; // 需将 scale 反转过来，保证线在视觉上永远是绝对粗细
  width: number;
  color: string;
  lineJoin: TLineJoin;
  close?: boolean;
}

export interface IDrawPerpendicularMarkOptions {
  scale: number; // 需将 scale 反转过来，保证线在视觉上永远是绝对粗细
  size: number; // 边长
  color: string;
}

export interface IDrawShapeOptions {
  type: TPointType;
  radius: number;
  lineWidth: number;
  lineColor: string;
  fillColor: string;
  scale: number;
}

export interface IDrawAreaOptions {
  color: string;
}
