import {
  Path
} from '@kcuf/geometry-basic';

import {
  EZoomHow
} from '../enum';

export type TSize = [number, number]; // 大小 [width, height]

export type TCreatingWillFinish = boolean | 'close';

/**
 * 对外提供的查找 MarkingItem 的方式，若为数字，可以表示根据给定 MarkingItem 向前或向后几个
 */
export type TMarkingItemFinder<T = unknown> = null | 'first' | 'last' | number | ((data: T) => boolean);

export type TZoomArg = EZoomHow | `${EZoomHow}`;

export interface IBeforeCreateCompleteResult<T = unknown> {
  path?: Path;
  data?: T;
}

export type TBeforeCreateCompleteResult<T = unknown> = IBeforeCreateCompleteResult<T> | false | undefined | Promise<IBeforeCreateCompleteResult<T> | false | undefined>;

/**
 * 新建完成前，供调整路径、填补数据或取消操作（返回值 `false` 或 `Promise<false>`）的回调
 */
export type TOnBeforeCreateComplete<T = unknown> = (path: Path, data?: T) => TBeforeCreateCompleteResult<T>;

/**
 * 修改路径完成前，调整路径
 */
export type TOnBeforeEditDragEnd<T = unknown> = (path: Path, data?: T) => Path | undefined;
