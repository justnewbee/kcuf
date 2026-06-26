import {
  TFetcherPostArgs,
  IFetcherClass,
  IFetcherConfigQuick,
  TFetcherParams,
  TFetcherBody
} from '../types';
import {
  mergeConfig
} from '../util';

/**
 * 用于执行带 body 的请求，对应 method 有 'POST' / 'PUT' / 'PATCH'
 */
export default function requestWithBody<T, B extends TFetcherBody, P extends TFetcherParams>(fetcher: IFetcherClass, method: string, args: TFetcherPostArgs<B, P>): Promise<T> {
  let config: IFetcherConfigQuick | undefined;
  let url: string;
  let body: B | undefined;
  let params: P | undefined;
  
  if (typeof args[0] === 'string') {
    [url, body, params] = args as [string, B, P];
  } else {
    [config, url, body, params] = args as [IFetcherConfigQuick, string, B, P];
  }
  
  return fetcher.request<T>(mergeConfig(config, {
    url,
    method,
    params,
    body
  }));
}
