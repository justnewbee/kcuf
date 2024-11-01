import type {
  TDefaultParams
} from '../types';

import resolveDefaultParams from './resolve-default-params';

/**
 * 合并默认参数
 */
export default function mergeDefaultParams(factoryDefaultParams?: TDefaultParams, defaultParams?: TDefaultParams): TDefaultParams | undefined {
  if (typeof factoryDefaultParams === 'function' || typeof defaultParams === 'function') { // 任意一者为方法，则返回方法
    return () => ({
      ...resolveDefaultParams(factoryDefaultParams),
      ...resolveDefaultParams(defaultParams)
    });
  }
  
  return {
    ...factoryDefaultParams,
    ...defaultParams
  };
}