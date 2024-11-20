export type TSize = [number, number]; // 大小 [width, height]

export type TCreatingWillFinish = boolean | 'close';

/**
 * 对外提供的查找 MarkingItem 的方式，若为数字，可以表示根据给定 MarkingItem 向前或向后几个
 */
export type TMarkingItemFinder<T = unknown> = null | 'first' | 'last' | number | ((data: T) => boolean);

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
