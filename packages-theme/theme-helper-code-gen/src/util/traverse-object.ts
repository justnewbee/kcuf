import _forEach from 'lodash/forEach';

type TTraverseCallback = (value: unknown, path: string[]) => void;

function traverseObjectWithPath<T extends object>(o: T, callback: TTraverseCallback, path: string[] = []): void {
  _forEach(o, (v, k) => {
    const pathNew = [...path, k];
    
    if (v && typeof v === 'object') {
      traverseObjectWithPath(v as Record<string, unknown>, callback, pathNew);
    } else {
      callback(v, pathNew);
    }
  });
}

/**
 * 递归遍历对象
 */
export default function traverseObject<T extends object>(o: T, callback: TTraverseCallback): void {
  traverseObjectWithPath(o, callback);
}
