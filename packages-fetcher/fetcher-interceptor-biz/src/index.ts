import {
  Fetcher
} from '@kcuf/fetcher-core';

import {
  IInterceptBizOptions
} from './types';
import {
  createInterceptorResponseFulfilled
} from './util';

export default function interceptBiz(fetcher: Fetcher, options?: IInterceptBizOptions, priority?: number): () => void {
  return fetcher.interceptResponse(createInterceptorResponseFulfilled(options), undefined, priority);
}

export type {
  IFetcherConfigBiz as FetcherConfigBiz,
  IInterceptBizOptions as FetcherInterceptBizOptions
} from './types';
