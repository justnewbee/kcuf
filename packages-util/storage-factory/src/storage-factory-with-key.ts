import {
  IStorageFn
} from './types';
import storageFactory from './storage-factory';

/**
 * 可以在不对外暴露 `wholeDataKey` 细节的情况下，用于生成多个 StorageFn
 */
export default function storageFactoryWithKey(wholeDataKey: string): <T extends object>(defaultValue: Required<T>, session?: boolean) => IStorageFn<T> {
  return <T extends object>(defaultValue: Required<T>, session?: boolean) => storageFactory<T>(wholeDataKey, defaultValue, session);
}
