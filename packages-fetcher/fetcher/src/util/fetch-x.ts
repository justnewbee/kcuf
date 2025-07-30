import fetcherFetch from '@kcuf/fetcher-fetch';
import fetcherXhr from '@kcuf/fetcher-xhr';
import fetcherJsonp from '@kcuf/fetcher-jsonp';

import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';

import isJsonp from './is-jsonp';
import buildUrl from './build-url';
import buildOptionsForFetch from './build-options-for-fetch';
import buildOptionsForJsonp from './build-options-for-jsonp';
import buildOptionsForXhr from './build-options-for-xhr';
import buildResponseX from './build-response-x';

/**
 * 将 fetch 和 jsonp 整合在一起（即当 method 为 'JSONP' 的时候会发送 JSONP 请求）
 */
export default async function fetchX<T = unknown>(config: IFetcherConfig): Promise<IFetcherResponse<T>> {
  const fetchUrl = buildUrl(config);
  
  if (isJsonp(config)) {
    return buildResponseX<T>(await fetcherJsonp<T>(fetchUrl, buildOptionsForJsonp(config)), config);
  }
  
  if (/^POST$/i.test(config.method ?? '') && config.onProgress) { // 支持进度上传
    return buildResponseX(await fetcherXhr<T>(fetchUrl, buildOptionsForXhr(config)), config);
  }
  
  return buildResponseX<T>(await fetcherFetch(fetchUrl, buildOptionsForFetch(config)), config);
}
