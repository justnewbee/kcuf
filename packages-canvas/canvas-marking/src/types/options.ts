import {
  IMarkingAuxiliaryLine
} from './common';
import {
  IMarkingConfigItem,
  IMarkingItemConfig
} from './marking-item-class';
import {
  IBeforeDragEnd,
  IOptionsEvents
} from './events';
import {
  IMarkingPluginTooltipOptions,
  IMarkingPluginZoomOptions
} from './plugin';

export interface IMarkingStageOptions<T> extends IMarkingItemConfig, IOptionsEvents<T> {
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
  // --- 可选插件 --- //
  pluginTooltip?: boolean | IMarkingPluginTooltipOptions<T>;
  pluginZoom?: boolean | IMarkingPluginZoomOptions;
  pluginMove?: boolean;
  pluginFps?: boolean;
  pluginStats?: boolean;
  // --- 其他 --- //
  /**
   * 可以在拖拽结束时按需自动调整路径的钩子函数
   */
  beforeDragEnd?: IBeforeDragEnd<T>;
}