import {
  FetcherConfig,
  FetcherInterceptResponseFulfilled,
  cloneResponseData
} from '@kcuf/fetcher';

import parseCacheLocalOptions from './parse-cache-local-options';
import cacheRemoveMatched from './cache-remove-matched';
import cacheResolve from './cache-resolve';

export default function createInterceptorResponseFulfilled(): FetcherInterceptResponseFulfilled {
  return (data: unknown, config: FetcherConfig): unknown => {
    if (config.cacheLocalRemove) {
      cacheRemoveMatched(config.cacheLocalRemove);
    }
    
    const cacheLocal = parseCacheLocalOptions(config);
    
    if (cacheLocal) {
      cacheResolve(cacheLocal.key, data, cacheLocal.ttl);
    }
    
    return cloneResponseData(data); // 避免第一个请求对 data 做了 mutation 而影响到后续的结果
  };
}
