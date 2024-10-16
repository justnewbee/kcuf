export interface IStorageFn<T extends object> {
  /**
   * 获取整个对象
   */
  (): T;
  /**
   * 部分更新（单项）
   */
  update<K extends keyof T>(key: K, value: T[K]): T;
  /**
   * 部分更新（多项）
   */
  update(partial: Partial<T>): T;
  /**
   * 全量更新
   */
  save(data: T): T;
}
