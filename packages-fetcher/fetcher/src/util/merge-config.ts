import {
  forEach as _forEach
} from 'lodash-es';

import {
  IFetcherConfig
} from '../types';

import normalizeHeaders from './normalize-headers';
import mergeParams from './merge-params';

/**
 * 将多个 FetcherConfig 进行合并
 */
export default function mergeConfig(...args: (IFetcherConfig | undefined)[]): IFetcherConfig {
  const finalConfig: IFetcherConfig = {};
  
  finalConfig.headers = normalizeHeaders(finalConfig.headers);
  
  args.forEach(partialConfig => {
    _forEach(partialConfig, (v, k) => {
      if (v === undefined) {
        return;
      }
      
      switch (k as keyof IFetcherConfig) {
        case 'headers': // header 会做 merge
          finalConfig.headers = {
            ...finalConfig.headers,
            ...normalizeHeaders(v as unknown as Record<string, string>)
          };
          
          break;
        case 'params': // 参数和 body 也会做 merge
          finalConfig.params = mergeParams([finalConfig.params, v]);
          
          break;
        case 'body':
          finalConfig.body = mergeParams([finalConfig.body, v]);
          
          break;
        default: // 其他，替换
          (finalConfig as any)[k] = v;
          
          break;
      }
    });
  });
  
  return finalConfig;
}
