import {
  IStorageFn
} from '../types';

export default function storageFactory<T extends object>(wholeDataKey: string, defaultValue: T, session?: boolean): IStorageFn<T> {
  const storage = session ? sessionStorage : localStorage;
  
  const storageWhole: IStorageFn<T> = (): T => {
    try { // getItem 和 JSON.parse 都可能出错
      const str = storage.getItem(wholeDataKey);
      
      if (str) {
        return {
          ...defaultValue,
          ...JSON.parse(str)
        };
      }
    } catch (_err) {
      // ignore
    }
    
    return {
      ...defaultValue
    };
  };
  
  function save(wholeData: T): T {
    try {
      storage.setItem(wholeDataKey, JSON.stringify(wholeData));
    } catch (_err) {
      // ignore
    }
    
    return wholeData;
  }
  
  function update<K extends keyof T>(...args: [Partial<T>] | [K, T[K]]): T {
    const data = storageWhole();
    let dataToSave: T;
    
    if (typeof args[0] === 'object') {
      dataToSave = {
        ...data,
        ...args[0]
      };
    } else {
      dataToSave = {
        ...data,
        [args[0]]: args[1]
      };
    }
    
    save(dataToSave);
    
    return dataToSave;
  }
  
  storageWhole.save = save;
  storageWhole.update = update;
  
  return storageWhole;
}
