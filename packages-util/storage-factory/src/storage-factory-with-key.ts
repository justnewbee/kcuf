import {
  TStorageFactoryWithKey
} from './types';
import storageFactory from './storage-factory';

/**
 * 可以在不对外暴露 `oneKey` 细节的情况下，用于生成多个 `StorageFn`
 */
export default function storageFactoryWithKey(oneKey: string): TStorageFactoryWithKey {
  return <T extends object>(defaultValue: Required<T>, session?: boolean) => storageFactory<T>(oneKey, defaultValue, session);
}
