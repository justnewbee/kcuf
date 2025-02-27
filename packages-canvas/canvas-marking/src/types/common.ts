import {
  Path
} from '@kcuf/geometry-basic';

import {
  EZoomHow
} from '../enum';

export type TSize = [number, number]; // 大小 [width, height]

export type TCreatingWillFinish = boolean | 'close';

/**
 * 对外提供的查找 `MarkingItem` 的方式
 *
 * - `null`
 * - `'first'` 第一个
 * - `'last'` 最末一个
 * - `number` 向前（复数）或向后
 * - `string` 根据 `id` 查找
 * - `(id: string, data?: T) => boolean` 更细节的查找
 */
export type TMarkingItemFinder<T = unknown> = null | 'first' | 'last' | string | number | ((id: string, data?: T) => boolean);

export type TZoomArg = EZoomHow | `${EZoomHow}`;

export interface ICreateCompletePreResult<T = unknown> {
  path?: Path;
  data?: T;
}

export interface IEditDragEndPreResult<T = unknown> {
  path?: Path;
  data?: T;
}

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
export interface INoOptions {
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
