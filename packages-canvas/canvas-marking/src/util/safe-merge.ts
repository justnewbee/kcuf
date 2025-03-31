import _forEach from 'lodash/forEach';

// 不直接析构混入，避免不小心混入 `undefined`，这个方法会修改 o
export default function safeMerge<T extends object>(o: T, o2?: Partial<T>): T {
  _forEach(o2, (v, k) => {
    if (v !== undefined) {
      (o as Record<string, unknown>)[k] = v;
    }
  });
  
  return o;
}
