import {
  Fetcher
} from '@kcuf/fetcher-core';

import {
  IFetcherInterceptorBizOptions
} from './types';
import {
  createInterceptorResponseFulfilled
} from './util';

export default function interceptBiz(fetcher: Fetcher, options?: IFetcherInterceptorBizOptions, priority?: number): () => void {
  return fetcher.interceptResponse(createInterceptorResponseFulfilled(options), undefined, priority);
}

export type {
  IFetcherConfigBiz as FetcherConfigBiz,
  IFetcherInterceptorBizOptions as FetcherInterceptorBizOptions
} from './types';
