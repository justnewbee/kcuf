import fetcherFetch from '@kcuf/fetcher-fetch';
import fetcherXhr from '@kcuf/fetcher-xhr';
import fetcherJsonp from '@kcuf/fetcher-jsonp';
import {
  FetcherResponse,
  FetcherHeadersNormalized,
  FetcherBodyNormalized,
  isConfigJsonp
} from '@kcuf/fetcher-core';

import {
  IFetcherConfig
} from '../types';

import buildResponseX from './build-response-x';

/**
 * 将 fetch 和 jsonp 整合在一起（即当 method 为 'JSONP' 的时候会发送 JSONP 请求）
 */
export default async function fetchX<T = unknown>(url: string, headers: FetcherHeadersNormalized, body: FetcherBodyNormalized, config: IFetcherConfig): Promise<FetcherResponse<T>> {
  if (isConfigJsonp(config)) {
    return buildResponseX<T>(await fetcherJsonp<T>(url, {
      timeout: config.timeout,
      charset: config.charset,
      jsonpCallback: config.jsonpCallback,
      jsonpCallbackFunction: config.jsonpCallbackFunction,
      signal: config.signal
    }), config);
  }
  
  if (config.onProgress) { // 支持上传进度需要底层用 xhr
    return buildResponseX(await fetcherXhr<T>(url, {
      method: config.method,
      timeout: config.timeout,
      signal: config.signal,
      withCredentials: config.credentials !== 'omit',
      headers,
      body,
      onProgress: config.onProgress
    }), config);
  }
  
  const { // 剔除 JSONP 参数
    charset,
    jsonpCallback,
    jsonpCallbackFunction,
    ...restConfig
  } = config;
  
  return buildResponseX<T>(await fetcherFetch(url, {
    ...restConfig,
    headers,
    body
  }), config);
}
