import {
  EMarkingStatsChangeCause
} from '../enum';

import {
  IMarkingItemStats,
  IMarkingStageStats
} from './stats';

export interface IMarkingPluginTooltipOptions<T> {
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

export interface IMarkingPluginZoomOptions {
  step?: number; // 键盘或点击要快档
  stepWheel?: number; // 滚轮可以顺滑一些
  min?: number;
  max?: number;
}

export interface IMarkingPlugin<T> {
  run?(stats: IMarkingStageStats<T>, changeCause: EMarkingStatsChangeCause): void;
  cleanup?(): void;
}
