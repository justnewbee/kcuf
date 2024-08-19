import {
  Fetcher
} from '@kcuf/fetcher';

import {
  IFetcherInterceptBizOptions
} from '../types';

import createInterceptorResponseFulfilled from './create-interceptor-response-fulfilled';

export default function intercept(fetcher: Fetcher, options?: IFetcherInterceptBizOptions): () => void {
  return fetcher.interceptResponse(createInterceptorResponseFulfilled(options));
}
