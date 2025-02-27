// `CanvasMarking` + `CanvasMarkingItem` 通用的 options

/**
 * 交互流程
 *
 * +---------------------------------------+
 * | hover → click → select -----→ edit    |
 * |                          └--→ delete  |
 * +---------------------------------------+
 *
 * - `noHover`: 无 hover 样式、无 tooltip、z-index 最低 ⇒ `noClick`
 * - `noClick`: 无 click 事件 ⇒ `noSelect`
 * - `noSelect`: 无 select 样式，不响应 `select` 方法 ⇒ `noDelete`
 * - `noDelete`: 不响应删除
 */
export interface ICommonNoActionOptions {
  noHover?: boolean;
  noClick?: boolean;
  noSelect?: boolean;
  /**
   * noEdit = noEditDragPoint && noEditDragInsertion && noEditDragWhole && noEditRemovePoint
   */
  noEdit?: boolean;
  noEditDragPoint?: boolean;
  noEditDragInsertion?: boolean;
  noEditDragWhole?: boolean;
  noEditRemovePoint?: boolean;
  noDelete?: boolean;
  /**
   * 是否禁用（默认不禁）交叉检测
   *
   * - false：默认，若交叉，将不允许完成新建和编辑
   * - true：允许交叉
   */
  noCrossingDetection?: boolean;
}

export interface ICommonBehaviorOptions extends ICommonNoActionOptions {
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
}
