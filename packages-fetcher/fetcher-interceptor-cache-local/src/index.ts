import {
  Fetcher
} from '@kcuf/fetcher-core';

import {
  createInterceptorRequest,
  createInterceptorResponseFulfilled,
  createInterceptorResponseRejected
} from './util';

export default function interceptCacheLocal(fetcher: Fetcher, priority = 20): () => void {
  const release1 = fetcher.interceptRequest(createInterceptorRequest(), priority);
  const release2 = fetcher.interceptResponse(createInterceptorResponseFulfilled(), createInterceptorResponseRejected(), priority);
  
  return () => {
    release1();
    release2();
  };
}

export type {
  ICacheLocal as CacheLocal,
  IFetcherConfigCacheLocal as FetcherConfigCacheLocal
} from './types';
