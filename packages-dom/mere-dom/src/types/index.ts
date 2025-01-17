export type TSelector<E extends Element = Element> = E | string | null;
export type TParent = Document | Element;

export interface IViewport {
  width: number;
  height: number;
  scrollTop: number;
  scrollLeft: number;
}

export interface IRect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}

export interface ITriggerFocusOptions extends FocusOptions {
  /**
   * 目前尚处于实验阶段，`FocusOptions` 中尚未定义
   */
  focusVisible?: boolean;
  /**
   * focus 后是否改变光标位置，默认保持不变
   */
  cursor?: 'start' | 'end';
}
