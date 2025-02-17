import {
  IMarkingStyleAuxiliary,
  IMarkingStyleConfig
} from './style';
import {
  IMarkingEvents
} from './events';
import {
  IMarkingItemStats
} from './stats';
import {
  ICommonBehaviorOptions
} from './options-common';
import {
  IMarkingConfigItem
} from './canvas-marking-item-class';

export interface IZoomOptions {
  step?: number; // 键盘或点击要快点
  stepWheel?: number; // 滚轮可以顺滑一些
  min?: number;
  max?: number;
}

export interface ITooltipOptions<T = unknown> {
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

export interface ICanvasMarkingOptions<T = unknown> extends ICommonBehaviorOptions, IMarkingEvents<T> {
  // --- 数据 --- //
  image?: string;
  markings?: IMarkingConfigItem<T>[];
  // --- 展示 --- //
  imageBgc?: string; // 没有图片的时候填充色（有助于辨别 move 后的边界）
  auxiliaryStyle?: IMarkingStyleAuxiliary;
  styleConfig?: IMarkingStyleConfig;
  // --- 行为 --- //
  /**
   * 利用 debug 库将所有的事件打印出来，需设置 `localStorage.debug = 'canvas-marking'`
   */
  debugEvents?: boolean;
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
  zoomOptions?: IZoomOptions;
  tooltipOptions?: ITooltipOptions<T>;
}
