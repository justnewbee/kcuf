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
} from './types';
import {
  buildResponse
} from './util';

/**
 * 将 fetch 和 jsonp 整合在一起（method 为 'JSONP' 时发送 JSONP 请求）
 */
export default async function fetchTransportWeb<T = unknown>(url: string, headers: FetcherHeadersNormalized, body: FetcherBodyNormalized, config: IFetcherConfig): Promise<FetcherResponse<T>> {
  if (isConfigJsonp(config)) { // JSONP 用不到 headers 和 body
    return buildResponse<T>(await fetcherJsonp<T>(url, {
      timeout: config.timeout,
      charset: config.charset,
      jsonpCallback: config.jsonpCallback,
      jsonpCallbackFunction: config.jsonpCallbackFunction,
      signal: config.signal
    }), config);
  }
  
  if (config.onProgress) { // 上传进度需要底层用 xhr，没法用 fetch
    return buildResponse(await fetcherXhr<T>(url, {
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
  
  return buildResponse<T>(await fetcherFetch(url, {
    ...restConfig,
    headers,
    body
  }), config);
}
