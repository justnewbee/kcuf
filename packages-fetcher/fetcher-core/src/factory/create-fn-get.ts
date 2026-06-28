import {
  IFetcherClass,
  TFetcherParams,
  TFetcherArgsJsonp,
  IFetcherFnGet
} from '../types';
import {
  mergeConfig,
  parseArgsGet
} from '../util';

export default function createFnGet(fetcher: IFetcherClass, method: 'GET' | 'JSONP'): IFetcherFnGet {
  return <T, P extends TFetcherParams>(...args: TFetcherArgsJsonp<P>): Promise<T> => {
    const [config, url, params] = parseArgsGet(args);
    
    return fetcher.request<T>(mergeConfig(config, {
      url,
      method,
      params
    }));
  };
}
