export interface IStorageFn<T extends object> {
  (): T;
  update<K extends keyof T>(key: K, value: T[K]): void;
  update(wholeData: Partial<T>): void;
  /**
   * 全量更新
   */
  save(data: T): void;
}
