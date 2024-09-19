import _cloneDeep from 'lodash/cloneDeep';

import {
  FetcherConfig,
  FetcherFnInterceptRequest,
  FetcherInterceptRequestReturn,
  createFetcherErrorSkipNetwork
} from '@kcuf/fetcher';

import parseCacheLocalOptions from './parse-cache-local-options';
import cacheGet from './cache-get';
import cacheAdd from './cache-add';

export default function createInterceptorRequest(): FetcherFnInterceptRequest {
  return (fetcherConfig: FetcherConfig): FetcherInterceptRequestReturn => {
    const cacheLocal = parseCacheLocalOptions(fetcherConfig);
    
    // 不需要 cacheLocal，直接跳过，将继续请求
    if (!cacheLocal) {
      return;
    }
    
    const {
      key
    } = cacheLocal;
    const cache = cacheGet(key);
    
    // 第 0 个请求 - 没有缓存，或缓存已过期
    if (!cache || (cache.ttl > 0 && Date.now() - cache.time > cache.ttl)) {
      cacheAdd(key);
      
      return;
    }
    
    const {
      queue,
      data
    } = cache;
    
    // 1. 第 0 个请求还在请求中，则附之
    if (queue) {
      const promise = new Promise((resolve, reject) => queue.push({
        resolve,
        reject
      }));
      
      throw createFetcherErrorSkipNetwork(promise, fetcherConfig);
    }
    
    // 重新请求的场景，不要和之前的第 0 个请求逻辑合并
    // 1. 指定 overwrite
    // 2. 当前的缓存不会过期，但新的请求设置了过期
    if (cacheLocal.overwrite || (cache.ttl <= 0 && cacheLocal.ttl > 0)) {
      cacheAdd(key);
      
      return;
    }
    
    // 命中缓存
    throw createFetcherErrorSkipNetwork(_cloneDeep(data), fetcherConfig); // 返回 clone 后的数据避免副作用
  };
}
