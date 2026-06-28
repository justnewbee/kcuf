import {
  IFetcherClass,
  TFetcherParams,
  TFetcherArgsJsonp,
  IFetcherFnGetWithAbort,
  IPromiseWithAbort
} from '../types';
import {
  mergeConfig,
  parseArgsGet
} from '../util';

export default function createFnGetWithAbort(fetcher: IFetcherClass, method: 'GET' | 'JSONP'): IFetcherFnGetWithAbort {
  return <T, P extends TFetcherParams>(...args: TFetcherArgsJsonp<P>): IPromiseWithAbort<T> => {
    const [config, url, params] = parseArgsGet(args);
    const abortController = new AbortController();
    const abort = (): void => abortController.abort();
    const promise = fetcher.request<T>(mergeConfig(config, {
      url,
      method,
      params,
      signal: abortController.signal
    })) as IPromiseWithAbort<T>;
    
    promise.abort = abort;
    
    return promise;
  };
}
