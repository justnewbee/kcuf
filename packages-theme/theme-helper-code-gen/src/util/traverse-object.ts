import {
  forEach as _forEach
} from 'lodash-es';

interface ITraverseCallback {
  (value: unknown, path: string[]): void;
}

export default function traverseObject<T extends object>(o: T, callback: ITraverseCallback, path: string[] = []): void {
  _forEach(o, (v, k) => {
    const pathNew = [...path, k];
    
    if (v && typeof v === 'object') {
      traverseObject(v as Record<string, unknown>, callback, pathNew);
    } else {
      callback(v, pathNew);
    }
  });
}