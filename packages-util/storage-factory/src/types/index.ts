export interface IStorageFn<T extends object> {
  (): T;
  update<K extends keyof T>(key: K, value: T[K]): T;
  update(wholeData: Partial<T>): T;
  /**
   * 全量更新
   */
  save(data: T): T;
}
