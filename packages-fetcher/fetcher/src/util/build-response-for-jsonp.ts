import {
  JsonpResponse
} from '@kcuf/fetcher-jsonp';

import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';

import buildResponseX from './build-response-x';

/**
 * 将 JSONP 的返回转成通用的 FetcherResponse
 *
 * 由于 JSONP 的实现原理，它没有 headers，且一定是成功的（因为如果失败或返回无效的话是无法走到回调的）
 */
export default async function buildResponseForJsonp<T>(response: JsonpResponse<T>, config: IFetcherConfig): Promise<IFetcherResponse<T>> {
  return buildResponseX(response, {}, config);
}
