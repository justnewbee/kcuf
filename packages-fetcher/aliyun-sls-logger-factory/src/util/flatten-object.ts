import _isPlainObject from 'lodash/isPlainObject';
import _isError from 'lodash/isError';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';

import type {
  ISlsFlattenOptions
} from '../types';

import convertErrorToPlain from './convert-error-to-plain';
import flattenShouldIgnore from './flatten-should-ignore';

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
export default function flattenObject<T extends object>(o: T, options?: string | ISlsFlattenOptions): Record<string, unknown> {
  const resolvedOptions = typeof options === 'string' ? {
    prefix: options
  } : options || {};
  const {
    prefix,
    depth = 3,
    ignore
  } = resolvedOptions;
  const result: Record<string, unknown> = {};
  
  function loop(currentObj: Record<string, unknown>, parentPaths: string[]): void {
    const depthFull = depth > 0 && parentPaths.length + 1 >= depth;
    
    _forEach(currentObj, (v: unknown, k: string) => {
      const key = [...parentPaths, k].join('.');
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      
      // 可以忽略不重要的信息
      if (flattenShouldIgnore(ignore, key, k, v)) {
        return;
      }
      
      // 深度满了，或者不是对象或 Error，或者空对象（或数组），则不继续 loop
      if (depthFull || !(_isError(v) || _isPlainObject(v)) || _isEmpty(v)) {
        result[prefixedKey] = v;
        
        return;
      }
      
      loop(_isError(v) ? convertErrorToPlain(v) : v as Record<string, unknown>, [...parentPaths, k]);
    });
  }
  
  loop(_isError(o) ? convertErrorToPlain(o) : o as Record<string, unknown>, []);
  
  return result;
}