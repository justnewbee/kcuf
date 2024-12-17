import {
  FetchOptions
} from '@kcuf/fetcher-fetch';

import {
  IFetcherConfig
} from '../types';

import processConfigHeadersAndBody from './process-config-headers-and-body';

export default function buildOptionsForFetch(config: IFetcherConfig): FetchOptions {
  const {
    // 剔除 JSONP 参数
    charset,
    jsonpCallback,
    jsonpCallbackFunction,
    // 剔除需要进一步处理的
    body: bodyOmitted,
    ...options
  } = config;
  const [headers, body] = processConfigHeadersAndBody(config);
  
  return {
    ...options,
    headers,
    body
  };
}
