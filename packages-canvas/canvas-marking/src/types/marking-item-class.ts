import {
  Path
} from '@kcuf/geometry-basic';

import {
  EMarkingMouseStatus
} from '../enum';

import {
  IMarkingBorderStyle,
  IMarkingBorderStyleDiff,
  IMarkingFillStyle,
  IMarkingPointStyle
} from './style';
import {
  IMarkingItemStats
} from './stats';
import {
  IBeforeHook
} from './events';

/**
 * 从 Marking 对象透传到 MarkingItem 的选项，可以在 new MarkingItem 的时候有一部分覆盖
 */
export interface IMarkingItemConfig {
  /**
   * 默认自由形状，设置 rect 可以画矩形
   *
   * - free 自由形状
   * - rect 正向矩形（由对角线决定矩形）
   * - rect2 可以画带转向的矩形（先画一条边，再决定另一条边的高度）
   */
  type?: 'free' | 'rect' | 'rect2';
  // --- 各种状态下的样式 --- //
  borderStyle?: IMarkingBorderStyle;
  borderStyleHovering?: IMarkingBorderStyle;
  borderStyleHighlighting?: IMarkingBorderStyle;
  borderStyleEditing?: IMarkingBorderStyle;
  pointStyle?: IMarkingPointStyle;
  pointStyleHovering?: IMarkingPointStyle;
  pointStyleHighlighting?: IMarkingPointStyle;
  pointStyleEditing?: IMarkingPointStyle;
  fillStyle?: IMarkingFillStyle;
  fillStyleHovering?: IMarkingFillStyle;
  fillStyleHighlighting?: IMarkingFillStyle;
  fillStyleEditing?: IMarkingFillStyle;
  // --- 行为 --- //
  /**
   * 可以单点禁止编辑
   */
  disabled?: boolean;
  /**
   * 路径支持最少点数，若完成绘制时，不满足此值，视为取消
   *
   * 取值：
   *
   * - 默认 → 3
   * - 小于 2 → 3，因为一个点毫无意义
   * - 2 → 将允许线段
   * - 大于等于 3 → 只允许平面（不允许线段）
   */
  pointCountMin?: number;
  /**
   * 路径支持最多点数，若到达此值，则自动完成绘制
   *
   * 取值：
   *
   * - 0 / -1 → 不限制上限
   * - 小于等于 pointCountMin，将限制为 pointCountMin，即只能 n 个边
   * - 其他，有上限
   */
  pointCountMax?: number;
  // 💥 以下不允许在 new MarkingItem 的时候进行修改
  /**
   * 插入点在两个端点距离（视觉值，并非实际值）小于此值时，不显示
   */
  pointInsertionMinDistance?: number;
  /**
   * 是否禁用（默认不禁）在端点中间加入插入点
   *
   * - false：默认，可插
   * - true：不可插
   */
  noPointInsertion?: boolean;
  /**
   * 是否禁用（默认不禁）交叉检测
   *
   * - false：默认，若交叉，将不允许完成新建和编辑
   * - true：允许交叉
   */
  noCrossingDetection?: boolean;
  /**
   * 是否禁用（默认不禁）拖动整体
   *
   * - false：默认，可拖路径整体
   * - true：无法拖路径整体，但还可以拖动节点
   */
  noDragWhole?: boolean;
}

export interface IMarkingConfigItemBorderDiff {
  all?: IMarkingBorderStyleDiff;
  hover?: IMarkingBorderStyleDiff; // 复用于 highlight
  [index: number]: IMarkingBorderStyleDiff;
}

export interface IMarkingConfigItem<T = void> extends IMarkingItemConfig {
  path?: Path;
  data?: T; // 附加数据，可以添加你需要的任何数据
  /**
   * 针对第 n 边（起点为第 n 个点）做特定的设置；由于点可以动态添加或删除，因此静态
   * 属性无法胜任，可以传入 callback
   */
  borderDiff?: IMarkingConfigItemBorderDiff | ((data: T | undefined) => IMarkingConfigItemBorderDiff | undefined);
}

export interface IMarkingItemOptions<T> extends IMarkingConfigItem<T> {}

export interface IMarkingItemClass<T = void> {
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
   * 添加节点
   */
  pushPoint(): boolean | 'close' | 'last';
  
  finishCreating(beforeHook?: IBeforeHook<T>): boolean;
  
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
  
  finishDragging(beforeHook?: IBeforeHook<T>): boolean;
  
  refreshStats(): IMarkingItemStats<T>;
  
  draw(faded?: boolean): void;
  
  get stats(): IMarkingItemStats<T>;
}