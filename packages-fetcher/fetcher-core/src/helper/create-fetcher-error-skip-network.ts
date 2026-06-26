import {
  IFetcherConfig,
  IFetcherErrorSkipNetwork
} from '../types';

/**
 * 创建一个特殊的错误，它将被用于请求拦截器中，如果请求拦截器抛出此错误，则请求不会被执行，余下的拦截器将**都**不会被执行。
 * 跟其他的错误不同的是，Fetcher 会从这个错误中获取 result 并以它作为最终的返回结果。
 *
 * 它的作用场景：
 *
 * 1. 有缓存好已经获得到的结果，则直接返回结果
 * 2. 合并接口请求，则直接返回合并前的临时 Promise
 * 3. 请求被代理到新的 Promise
 */
export default function createFetcherErrorSkipNetwork<T = void>(result: T | Promise<T>, config: IFetcherConfig): IFetcherErrorSkipNetwork<T> {
  const error: IFetcherErrorSkipNetwork<T> = new Error() as IFetcherErrorSkipNetwork<T>;
  
  error.name = 'FetcherSkipNetwork';
  error.result = result;
  error.config = config;
  
  return error;
}
