import {
  TArgsForPost,
  IFetcherClassType,
  IFetcherConfigQuick,
  TFetcherParams,
  TFetcherBody
} from '../types';
import {
  mergeConfig
} from '../util';

/**
 * 用于执行带 body 的请求，对应点 method 有 'POST' / 'PUT' / 'PATCH'
 */
export default function requestWithBody<T, B extends TFetcherBody, P extends TFetcherParams>(fetcher: IFetcherClassType, method: string, args: TArgsForPost<B, P>): Promise<T> {
  let options: IFetcherConfigQuick | undefined;
  let url: string;
  let body: B | undefined;
  let params: P | undefined;
  
  if (typeof args[0] === 'string') {
    [url, body, params] = args as [string, B, P];
  } else {
    [options, url, body, params] = args as [IFetcherConfigQuick, string, B, P];
  }
  
  return fetcher.request<T>(mergeConfig(options, {
    url,
    method,
    params,
    body
  }));
}
