import {
  EMarkingStatsChangeCause
} from '../enum';

import {
  IMarkingItemStats,
  IMarkingStageStats
} from './stats';
import {
  IMarkingConfigItem,
  IMarkingItemConfig
} from './marking-item-class';
import {
  IMarkingPluginTooltipOptions,
  IMarkingPluginZoomOptions
} from './plugin';

/**
 * 辅助线设置
 */
export interface IMarkingAuxiliaryLine {
  /**
   * 距离多远（屏幕像素）之内，可以出辅助线，当距离小于 1 可认为重叠，重叠与未重叠需区分开
   */
  distance?: number;
  /**
   * 辅助线宽度
   */
  width?: number;
  /**
   * 辅助线颜色（重叠时）
   */
  color?: string;
  /**
   * 辅助线颜色（未重叠时）
   */
  colorNear?: string;
  /**
   * 辅助线虚线设置
   */
  dash?: number[];
}

export interface IMarkingStageOptions<T> extends IMarkingItemConfig {
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
   * 当存在新建或编辑状态，其他的图形（非 hover 状态）是否需要变浅，变浅的逻辑
   *
   * - 纯色：降低饱和度 + 提高亮度
   * - 透明色：透明度降低
   *
   * 💥 注意：不支持颜色名
   */
  inactiveFaded?: false;
  /**
   * 双击间隔时间，默认 200ms（这里没用用原生的 dblclick 事件，而是由单击模拟的）
   */
  doubleClickInterval?: number;
  selectClickMode?: 'single' | 'double';
  // --- 可选插件 --- //
  pluginTooltip?: boolean | IMarkingPluginTooltipOptions<T>;
  pluginZoom?: boolean | IMarkingPluginZoomOptions;
  pluginMove?: boolean;
  pluginFps?: boolean;
  pluginStats?: boolean;
  // --- 事件 --- //
  onMarkingCreateStart?(): void;
  onMarkingCreateCancel?(): void;
  onMarkingCreateComplete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onMarkingSelect?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onMarkingDoubleClick?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onMarkingPointRemove?(stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]): void;
  onMarkingPointInsert?(stats: IMarkingItemStats<T>, index: number, statsList: IMarkingItemStats<T>[]): void;
  onMarkingDragEnd?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onMarkingEditCancel?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onMarkingEditComplete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onMarkingDelete?(stats: IMarkingItemStats<T>, statsList: IMarkingItemStats<T>[]): void;
  onStatsChange?(stats: IMarkingStageStats<T>, cause: EMarkingStatsChangeCause): void;
  // onChange?({ data, path }[]): void; // TODO
}