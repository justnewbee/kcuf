import {
  IStorageFn
} from './types';

export default function storageFactory<T extends object>(oneKey: string, defaultValue: Required<T>, session?: boolean): IStorageFn<T> {
  const storage = session ? sessionStorage : localStorage;
  
  const storageWhole: IStorageFn<T> = (): Required<T> => {
    try { // getItem 和 JSON.parse 都可能出错
      const str = storage.getItem(oneKey);
      
      if (str) {
        return {
          ...structuredClone(defaultValue),
          ...JSON.parse(str) as Partial<T> // 这里会把 T 之外的所有信息都记录下来
        };
      }
    } catch (_err) {
      // ignore
    }
    
    return structuredClone(defaultValue);
  };
  
  function savePartial(updates: Partial<T>): Required<T> {
    const mergedData: Required<T> = {
      ...storageWhole(),
      ...updates
    };
    
    try {
      storage.setItem(oneKey, JSON.stringify(mergedData));
    } catch (_err) {
      // ignore
    }
    
    return mergedData;
  }
  
  function save(data: Required<T>): Required<T> {
    return savePartial(data);
  }
  
  function update<K extends keyof T>(...args: [Partial<T>] | [K, T[K]]): Required<T> {
    if (typeof args[0] === 'object') {
      return savePartial(args[0]);
    }
    
    return savePartial({
      [args[0]]: args[1]
    } as Partial<T>);
  }
  
  storageWhole.save = save;
  storageWhole.update = update;
  
  return storageWhole;
}
