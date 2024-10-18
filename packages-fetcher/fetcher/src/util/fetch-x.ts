import fetcherFetch from '@kcuf/fetcher-fetch';
import jsonp from '@kcuf/fetcher-jsonp';

import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';

import isJsonp from './is-jsonp';
import buildUrl from './build-url';
import buildResponseForFetch from './build-response-for-fetch';
import buildResponseForJsonp from './build-response-for-jsonp';
import buildFetchOptions from './build-fetch-options';
import buildJsonpOptions from './build-jsonp-options';

/**
 * 将 fetch 和 jsonp 整合在一起（即当 method 为 'JSONP' 的时候会发送 JSONP 请求）
 */
export default async function fetchX<T = unknown>(fetcherConfig: IFetcherConfig): Promise<IFetcherResponse<T>> {
  const fetchUrl = buildUrl(fetcherConfig);
  
  if (isJsonp(fetcherConfig)) {
    return buildResponseForJsonp<T>(await jsonp<T>(fetchUrl, buildJsonpOptions(fetcherConfig)), fetcherConfig);
  }
  
  return buildResponseForFetch<T>(await fetcherFetch(fetchUrl, buildFetchOptions(fetcherConfig)), fetcherConfig);
}
