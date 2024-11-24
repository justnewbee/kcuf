export interface IModelState {
  /**
   * 组件序号，在初始化的时候即确定，声明周期内不会变化
   */
  n: number;
  visible: boolean;
}
