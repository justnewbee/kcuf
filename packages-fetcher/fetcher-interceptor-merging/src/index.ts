import {
  Fetcher
} from '@kcuf/fetcher-core';

import {
  createInterceptorRequest,
  createInterceptorResponseFulfilled,
  createInterceptorResponseRejected
} from './util';

export default function interceptMerging(fetcher: Fetcher, priority = 30): () => void {
  const release1 = fetcher.interceptRequest(createInterceptorRequest(), priority);
  const release2 = fetcher.interceptResponse(createInterceptorResponseFulfilled(), createInterceptorResponseRejected(), priority);
  
  return () => {
    release1();
    release2();
  };
}

export type {
  IFetcherConfigMerging as FetcherConfigMerging
} from './types';
