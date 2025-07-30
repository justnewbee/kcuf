import {
  XhrOptions
} from '@kcuf/fetcher-xhr';

import {
  IFetcherConfig
} from '../types';

import processConfigHeadersAndBody from './process-config-headers-and-body';

export default function buildOptionsForXhr(config: IFetcherConfig): XhrOptions {
  const [headers, body] = processConfigHeadersAndBody(config);
  
  return {
    method: config.method,
    timeout: config.timeout,
    signal: config.signal,
    withCredentials: config.credentials !== 'omit',
    headers,
    body,
    onProgress: config.onProgress
  };
}
