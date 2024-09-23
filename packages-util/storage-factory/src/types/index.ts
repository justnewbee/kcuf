export interface IStorageFn<T extends object> {
  (): T;
  update<K extends keyof T>(key: K, value: T[K]): void;
  update(updates: Partial<T>): void;
}
