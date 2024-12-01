import {
  Fetcher
} from '@kcuf/fetcher';

import {
  ICreateInterceptorOptions
} from '../types';

import createInterceptorResponseRejected from './create-interceptor-response-rejected';

/**
 * 当接口报未登录，可以弹窗登录
 *
 * FIXME 和 merging 无法共存的问题
 *
 * 1. 多个请求时，只有第一个可以（要求优先级比 merging 高）
 * 2. 出错后，登录，成功，然无法成功（要求优先级比 merging 低）
 */
export default function intercept(fetcher: Fetcher, createInterceptorOptions: ICreateInterceptorOptions, priority = 40): () => void {
  return fetcher.interceptResponse(undefined, createInterceptorResponseRejected(createInterceptorOptions), priority);
}
