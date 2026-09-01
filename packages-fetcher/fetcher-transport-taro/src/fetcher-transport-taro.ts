import Taro, {
  request
} from '@tarojs/taro';
import {
  FetcherErrorName,
  FetcherConfig,
  FetcherResponse,
  FetcherHeadersNormalized,
  FetcherBodyNormalized,
  createFetcherError,
  headersNormalize
} from '@kcuf/fetcher-core';

import {
  toTaroResponseType,
  ensureError
} from './util';

export default function fetcherTransportTaro<T = unknown>(url: string, headers: FetcherHeadersNormalized, body: FetcherBodyNormalized, config: FetcherConfig): Promise<FetcherResponse<T>> {
  const {
    method = 'GET',
    signal,
    responseType = 'json',
    ...restConfig
  } = config;
  
  return request<T>({
    ...restConfig,
    method: method as Taro.request.Option['method'],
    url,
    header: headers,
    data: body,
    responseType: toTaroResponseType(responseType),
    signal: signal ?? undefined
  }).then(result => {
    if (result.statusCode < 200 || result.statusCode >= 300) {
      throw createFetcherError(config, {
        name: FetcherErrorName.RESPONSE_STATUS,
        message: `Response status ${result.statusCode}.`,
        code: `${result.statusCode}`,
        responseHeaders: result.header,
        responseData: result.data // 401 等状态还是会有 data
      });
    }
    
    // 若访问的是当前 location 下地址
    // MP data 会是 HTML 串（不论是否 404 地址）
    // H5 data 是 null
    if (responseType === 'json' && (!result.data || typeof result.data === 'string')) {
      throw createFetcherError(config, {
        name: FetcherErrorName.RESPONSE_PARSE,
        responseHeaders: result.header,
        responseData: result.data
      });
    }
    
    return {
      url,
      data: result.data,
      headers: headersNormalize(result.header)
    };
  }, (err: unknown) => {
    // MP，无权限接口（包括不存在的）会到这里 { errMsg: 'request:fail url not in domain list', errno: undefined }
    // H5，不存在的接口会报 CORS，得到 NetworkError
    throw createFetcherError(config, {
      name: FetcherErrorName.NETWORK,
      originalError: ensureError(err)
    });
  });
}
