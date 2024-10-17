import _cloneDeep from 'lodash/cloneDeep';

import {
  FetcherConfig,
  FetcherInterceptResponseFulfilled
} from '@kcuf/fetcher';

import parseCacheLocalOptions from './parse-cache-local-options';
import cacheRemoveMatched from './cache-remove-matched';
import cacheResolve from './cache-resolve';

export default function createInterceptorResponseFulfilled(): FetcherInterceptResponseFulfilled {
  return (data: unknown, fetcherConfig: FetcherConfig): unknown => {
    if (fetcherConfig.cacheLocalRemove) {
      cacheRemoveMatched(fetcherConfig.cacheLocalRemove);
    }
    
    const cacheLocal = parseCacheLocalOptions(fetcherConfig);
    
    if (cacheLocal) {
      cacheResolve(cacheLocal.key, data, cacheLocal.ttl);
    }
    
    return _cloneDeep(data); // 避免第一个请求对 data 做了 mutation 而影响到后续的结果
  };
}
