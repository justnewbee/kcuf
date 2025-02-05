export interface IClickHijacker<T = boolean> {
  /**
   * 判定条件，返回「真」即表示劫持成功，改返回值将作为 `callback` 的第二参数
   */
  condition(el: HTMLElement): T | void;
  /**
   * 劫持操作
   */
  callback?(el: HTMLElement, conditionResult: T): void;
  /**
   * 劫持后是否 `preventDefault`，默认对链接 `true`
   */
  shouldPreventDefault?: boolean;
  /**
   * 劫持后是否 `stopPropagation`，默认 `false`
   */
  shouldStopPropagation?: boolean;
}

export type TFnClickHandler = (el: HTMLElement, e: MouseEvent) => boolean;
