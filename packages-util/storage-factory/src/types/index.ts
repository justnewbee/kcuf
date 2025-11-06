export interface IStorageFn<T extends object> {
  /**
   * 获取整个对象
   */
  (): Required<T>;
  /**
   * 部分更新（单项）
   */
  update<K extends keyof T>(key: K, value: T[K]): Required<T>;
  /**
   * 部分更新（多项）
   */
  update(partial: Partial<T>): Required<T>;
  /**
   * 全量更新
   */
  save(data: Required<T>): Required<T>;
}
