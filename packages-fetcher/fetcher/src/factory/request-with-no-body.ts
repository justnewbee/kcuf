import {
  TFetcherJsonpArgs,
  TFetcherGetArgs,
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
export default function requestWithNoBody<T, P extends TFetcherParams>(fetcher: IFetcherClassType, method: string, args: TFetcherJsonpArgs<P> | TFetcherGetArgs<P>): Promise<T> {
  let config: IFetcherConfigQuick | undefined;
  let url: string;
  let params: P | undefined;
  
  if (typeof args[0] === 'string') {
    [url, params] = args as [string, P?];
  } else {
    [config, url, params] = args as [IFetcherConfigQuick, string, P?];
  }
  
  return fetcher.request<T>(mergeConfig(config, {
    url,
    method,
    params
  }));
}
