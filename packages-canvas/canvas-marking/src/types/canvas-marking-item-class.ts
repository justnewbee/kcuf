import {
  Path
} from '@kcuf/geometry-basic';

import {
  EMarkingMouseStatus
} from '../enum';

import {
  IMarkingStyleConfig
} from './style';
import {
  IMarkingItemStats
} from './stats';
import {
  IMarkingEvents
} from './events';
import {
  ICommonBehaviorOptions
} from './options-common';

/**
 * 从 `Marking` 对象透传到 `MarkingItem` 的选项，可以在 `new CanvasMarkingItem` 的时候有一部分覆盖
 */
export interface IMarkingItemConfig extends ICommonBehaviorOptions {
  /**
   * 默认自由形状，设置 rect 可以画矩形
   *
   * - free 自由形状
   * - rect 正向矩形（由对角线决定矩形）
   * - rect2 可以画带转向的矩形（先画一条边，再决定另一条边的高度）
   */
  type?: 'free' | 'rect' | 'rect2';
  /**
   * 样式配置
   */
  styleConfig?: IMarkingStyleConfig;
}

export interface IMarkingConfigItem<T = unknown> extends IMarkingItemConfig {
  id?: string; // 唯一性标识
  path?: Path;
  data?: T; // 附加数据，可以添加你需要的任何数据
}

/**
 * `new CanvasMarkingItem` 需要
 */
export interface IMarkingItemOptions<T = unknown> extends IMarkingConfigItem<T> {}

export interface IMarkingItemClass<T = unknown> {
  /**
   * 画直角标需要
   */
  getBorderColor(): string;
  
  toggleHovering(value?: boolean): void;
  
  toggleHighlighting(value?: boolean, borderIndex?: number | null): void;
  
  /**
   * 检查跟鼠标之间的关系（比 isUnderMouse 更细）
   */
  checkMouse(): EMarkingMouseStatus;
  
  /**
   * 选中，将可编辑、删除
   */
  select(): void;
  
  /**
   * 是否在鼠标下方（但不能自动触发 hover 状态，因为还有上下层的关系）
   */
  isUnderMouse(): boolean;
  
  /**
   * 取消激活，将不可编辑、删除，如果传入 cancel 则表示取消中间的所有编辑动作，还原（可用于 Escape 事件）
   */
  finishEditing(cancel?: boolean): boolean;
  
  /**
   * 新建时添加节点
   *
   * - false - 不加，继续
   * - number - 成功，返回其 index，继续
   * - close - 成功，闭合路径，完成新建
   * - last - 成功，添加的最末一个，完成新建
   */
  pushPoint(onPushPointPre?: IMarkingEvents<T>['onPointPushPre']): false | number | 'close' | 'last';
  
  finishCreating(onCreateCompletePre?: IMarkingEvents<T>['onCreateCompletePre']): false | Promise<boolean>;
  
  removePoint(): number;
  
  /**
   * 开始拖动，根据对应的鼠标位置，执行逻辑有所区别
   *
   * 1. 鼠标路径外 - 无反应
   * 2. 鼠标在拖拽点上 - 拖动点进行位移
   * 3. 鼠标在插入点上 - 拖动开始后将新拖拽点并进行点的位移
   * 4. 鼠标在路径内 - 拖动整体（必须 options.draggable）
   */
  startDragging(): boolean;
  
  /**
   * 处理拖动，返回结果
   *
   * - true 拖动
   * - false 未拖动
   * - number 新增节点（拖中点的情况）
   */
  processDragging(): boolean | number;
  
  finishDragging(onEditDragEndPre?: IMarkingEvents<T>['onEditDragEndPre']): boolean;
  
  refreshStats(): IMarkingItemStats<T>;
  
  draw(faded?: boolean): void;
  
  get stats(): IMarkingItemStats<T>;
}
