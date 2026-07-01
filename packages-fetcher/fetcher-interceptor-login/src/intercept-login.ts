import {
  Fetcher
} from '@kcuf/fetcher-core';

import {
  IFetcherInterceptorLoginOptions
} from './types';
import {
  createInterceptorResponseRejected
} from './util';

/**
 * 当接口报未登录，可以弹窗登录
 *
 * FIXME 和 merging 无法共存的问题
 *
 * 1. 多个请求时，只有第一个可以（要求优先级比 merging 高）
 * 2. 出错后，登录，成功，然无法成功（要求优先级比 merging 低）
 */
export default function interceptLogin(fetcher: Fetcher, options: IFetcherInterceptorLoginOptions, priority = 40): () => void {
  return fetcher.interceptResponse(undefined, createInterceptorResponseRejected(options), priority);
}
