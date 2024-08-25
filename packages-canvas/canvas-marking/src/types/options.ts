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
   * 辅助线宽度
   */
  width?: number;
  /**
   * 辅助线颜色
   */
  color?: string;
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
  // --- 可选插件 --- //
  pluginTooltip?: boolean | IMarkingPluginTooltipOptions<T>;
  pluginZoom?: boolean | IMarkingPluginZoomOptions;
  pluginMove?: boolean;
  pluginFps?: boolean;
  pluginStats?: boolean;
  // --- 事件 --- //
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
  onStatsChange?(stats: IMarkingStageStats<T>, cause: EMarkingStatsChangeCause): void;
  // onChange?({ data, path }[]): void; // TODO
}