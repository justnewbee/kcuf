import {
  Fetcher
} from '@kcuf/fetcher-core';

import {
  IFetcherInterceptBizOptions
} from './types';
import {
  createInterceptorResponseFulfilled
} from './util';

export default function intercept(fetcher: Fetcher, options?: IFetcherInterceptBizOptions, priority?: number): () => void {
  return fetcher.interceptResponse(createInterceptorResponseFulfilled(options), undefined, priority);
}

export type {
  IFetcherConfigAugmentBiz as FetcherConfigAugmentBiz,
  IFetcherInterceptBizOptions as FetcherInterceptBizOptions
} from './types';
