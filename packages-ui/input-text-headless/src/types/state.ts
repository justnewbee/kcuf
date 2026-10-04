export interface IModelState {
  value: string;
  /**
   * 中文输入法正在输入中，此时不要触发 `onChange`
   */
  composing: boolean;
}
