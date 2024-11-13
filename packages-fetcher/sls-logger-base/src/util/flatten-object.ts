import _isEmpty from 'lodash/isEmpty';
import _isPlainObject from 'lodash/isPlainObject';
import _forEach from 'lodash/forEach';

import type {
  IFlattenOptions
} from '../types';

import flattenTestPath from './flatten-test-path';
import normalizePayload from './normalize-payload';

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
export default function flattenObject(o: object, options: string | IFlattenOptions): Record<string, unknown> {
  const resolvedOptions = typeof options === 'string' ? {
    scope: options
  } : options;
  const {
    scope,
    depth = 5,
    omit,
    direct
  } = resolvedOptions;
  const result: Record<string, unknown> = {};
  
  function loop(currentObj: object, parentPaths: string[]): void {
    const depthFull = depth > 0 && parentPaths.length + 1 >= depth;
    
    _forEach(currentObj, (v: unknown, k: string) => {
      const pathKey = [...parentPaths, k].join('.');
      const scopedPathKey = scope ? `${scope}.${pathKey}` : pathKey;
      
      // 可以忽略不重要的信息，不记录方法，不记录 `_` 打头的数据
      if (/^_/.test(k) || typeof v === 'function' || (omit && flattenTestPath(pathKey, omit))) {
        return;
      }
      
      const normalizedV = normalizePayload(v as object);
      
      // 不继续 loop：
      // 1. 深度满了
      // 2. 不是对象（已经 normalize 掉了一部分）
      // 3. 空对象，或空数组
      // 4. 命中 `direct` 规则
      if (depthFull || !_isPlainObject(normalizedV) || _isEmpty(normalizedV) || (direct && flattenTestPath(pathKey, direct))) {
        result[scopedPathKey] = normalizedV;
        
        return;
      }
      
      loop(normalizedV, [...parentPaths, k]);
    });
  }
  
  loop(o, []);
  
  return result;
}
