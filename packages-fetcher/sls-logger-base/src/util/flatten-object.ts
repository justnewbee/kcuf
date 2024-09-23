import _isEmpty from 'lodash/isEmpty';
import _isPlainObject from 'lodash/isPlainObject';
import _isError from 'lodash/isError';
import _forEach from 'lodash/forEach';

import type {
  IFlattenOptions
} from '../types';

import convertErrorToPlain from './convert-error-to-plain';
import flattenTestPath from './flatten-test-path';

/**
 * 有时候为了统计方便，需要把传入的对象展平，比如 error 对象，可能会展平成如下形状：
 *
 * ```
 * {
 *   "error.name": "..",
 *   "error.message": "..",
 *   "error.stack": ".."
 * }
 * ```
 */
export default function flattenObject<T extends object>(o: T, options: string | IFlattenOptions): Record<string, unknown> {
  const resolvedOptions = typeof options === 'string' ? {
    scope: options
  } : options;
  const {
    scope,
    depth = 5,
    omit,
    pass
  } = resolvedOptions;
  const result: Record<string, unknown> = {};
  
  function makeSureErrorObject(errorOrObject: object): object {
    return _isError(errorOrObject) ? convertErrorToPlain(errorOrObject) : errorOrObject;
  }
  
  function loop(currentObj: object, parentPaths: string[]): void {
    const depthFull = depth > 0 && parentPaths.length + 1 >= depth;
    
    _forEach(currentObj, (v: unknown, k: string) => {
      const pathKey = [...parentPaths, k].join('.');
      const scopedPathKey = scope ? `${scope}.${pathKey}` : pathKey;
      
      // 可以忽略不重要的信息，默认不记录 `_` 打头的所有数据
      if (/^_/.test(k) || (omit && flattenTestPath(pathKey, omit))) {
        return;
      }
      
      const vAsObject = makeSureErrorObject(v as object);
      
      // 不继续 loop：
      // 1. 深度满了
      // 2. 不是对象，不是 Error
      // 3. 空对象，或空数组
      // 4. 命中 `pass` 规则
      if (depthFull || !_isPlainObject(vAsObject) || _isEmpty(vAsObject) || (pass && flattenTestPath(pathKey, pass))) {
        result[scopedPathKey] = vAsObject;
        
        return;
      }
      
      loop(vAsObject, [...parentPaths, k]);
    });
  }
  
  loop(makeSureErrorObject(o), []);
  
  return result;
}