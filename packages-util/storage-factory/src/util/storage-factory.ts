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
    } catch (err) {
      // ignore
    }
    
    return {
      ...defaultValue
    };
  };
  
  storageWhole.update = <K extends keyof T>(...args: [Partial<T>] | [K, T[K]]): void => {
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
    
    try {
      storage.setItem(wholeDataKey, JSON.stringify(dataToSave));
    } catch (err) {
      // ignore
    }
  };
  
  return storageWhole;
}
