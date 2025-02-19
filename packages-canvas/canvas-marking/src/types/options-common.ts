// `CanvasMarking` + `CanvasMarkingItem` 通用的 options

import {
  TEditable
} from './common';

/**
 * 控制行为
 */
export interface ICommonBehaviorOptions {
  /**
   * 是否可编辑，默认 `true`
   */
  editable?: TEditable;
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
  // 💥 以下不允许在 `new CanvasMarkingItem` 的时候进行修改
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
