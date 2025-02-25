import {
  Path
} from '@kcuf/geometry-basic';

import {
  EZoomHow
} from '../enum';

export type TSize = [number, number]; // 大小 [width, height]

/**
 * 可编辑状态
 *
 * - `true` 可编辑
 * - `false` 不可编辑（无法选中，但响应点击）
 * - `locked` 不可编辑（无法选中，也不响应点击）
 */
export type TEditable = boolean | 'locked';

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
