export interface IClickHijacker<T = boolean> {
  /**
   * 判定条件，返回「真」即表示劫持成功，返回值将作为 `callback` 的参数
   */
  condition(el: HTMLElement, e: MouseEvent): T | void;
  /**
   * 劫持操作
   */
  callback?(result: T, el: HTMLElement): void;
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
