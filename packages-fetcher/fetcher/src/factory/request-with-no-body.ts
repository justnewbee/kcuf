import {
  TArgsForJsonp,
  TArgsForGet,
  IFetcherClassType,
  IFetcherConfigQuick,
  TFetcherParams
} from '../types';
import {
  mergeConfig
} from '../util';

/**
 * 用于执行不带 body 的请求，对应点 method 有 'GET' / 'DELETE' / 'HEAD' / 'OPTIONS' / 'JSONP'
 */
export default function requestWithNoBody<T, P extends TFetcherParams>(fetcher: IFetcherClassType, method: string, args: TArgsForJsonp<P> | TArgsForGet<P>): Promise<T> {
  let options: IFetcherConfigQuick | undefined;
  let url: string;
  let params: P | undefined;
  
  if (typeof args[0] === 'string') {
    [url, params] = args as [string, P?];
  } else {
    [options, url, params] = args as [IFetcherConfigQuick, string, P?];
  }
  
  return fetcher.request<T>(mergeConfig(options, {
    url,
    method,
    params
  }));
}
