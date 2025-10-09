export type TUseAddableReturn<T extends object> = [T[], {
  /**
   * 添加项目
   */
  add(): void;
  /**
   * 更新一条项目
   */
  update(o: T): void;
  /**
   * 删除一条项目
   */
  remove(o: T): void;
  /**
   * 交换两个项目的位置（排序），比如用 react-easy-sort 进行拖拽排序
   */
  switchPosition(indexOld: number, indexNew: number): void;
}];

export type TFinder<T extends object> = (v1: T, v2: T) => boolean;
