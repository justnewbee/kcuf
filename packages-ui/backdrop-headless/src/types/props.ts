export interface IModelProps {
  /**
   * z-index 默认 100
   */
  zIndex?: number;
  /**
   * 是否点击关闭
   */
  closable?: boolean;
  /**
   * 点击关闭的回调，必须 `closable: true`
   */
  onClose?(): void;
}
