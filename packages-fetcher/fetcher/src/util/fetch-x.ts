import fetcherFetch, {
  FetchOptions
} from '@kcuf/fetcher-fetch';
import jsonp from '@kcuf/fetcher-jsonp';

import {
  IFetcherConfig,
  IFetcherResponse
} from '../types';

import isJsonp from './is-jsonp';
import canHaveBody from './can-have-body';
import serializeBody from './serialize-body';
import buildUrl from './build-url';
import buildResponseForFetch from './build-response-for-fetch';
import buildResponseForJsonp from './build-response-for-jsonp';

/**
 * 将 fetch 和 jsonp 整合在一起（即当 method 为 'JSONP' 的时候会发送 JSONP 请求）
 */
export default async function fetchX<T = unknown>(fetcherConfig: IFetcherConfig): Promise<IFetcherResponse<T>> {
  const {
    method,
    body,
    charset,
    jsonpCallback,
    jsonpCallbackFunction,
    signal,
    ...options
  } = fetcherConfig;
  const fetchUrl = buildUrl(fetcherConfig);
  
  if (isJsonp(fetcherConfig)) {
    return jsonp<T>(fetchUrl, {
      timeout: fetcherConfig.timeout,
      charset,
      jsonpCallback,
      jsonpCallbackFunction,
      signal
    }).then(response => buildResponseForJsonp<T>(response, fetcherConfig));
  }
  
  const fetchOptions: FetchOptions = {
    method,
    signal,
    ...options
  };
  
  /*
   * 调用 fetch 的时候，如果对 GET/HEAD 请求传入 body，哪怕只是一个空字符串，
   * 浏览器直接报错「HEAD or GET Request cannot have a body.」
   * 所以一定要 if
   */
  if (canHaveBody(fetcherConfig) && body) {
    fetchOptions.body = serializeBody(fetcherConfig);
  }
  
  return fetcherFetch(fetchUrl, fetchOptions).then(response => buildResponseForFetch<T>(response, fetcherConfig));
}
