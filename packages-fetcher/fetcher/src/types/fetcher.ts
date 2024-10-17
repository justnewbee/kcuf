import {
  IInterceptorEject
} from './common';
import {
  IFetcherConfig
} from './config';
import {
  IFetcherCallGetAlike,
  IFetcherCallJsonp,
  IFetcherCallPostAlike
} from './fn';
import {
  IFetcherInterceptRequest,
  IFetcherInterceptResponseFulfilled,
  IFetcherInterceptResponseRejected
} from './interceptor';

export interface IFetcherClassType {
  /**
   * 发送请求：前置请求拦截器 → 网络请求 → 后置响应拦截器
   */
  request<T = unknown>(fetcherConfig: IFetcherConfig): Promise<T>;
  
  /**
   * 添加「预设」请求拦截器，返回解除拦截的无参方法
   */
  interceptRequest(onFulfilled: IFetcherInterceptRequest, priority?: number): IInterceptorEject;
  
  /**
   * 添加「预设」响应拦截器，返回解除拦截的无参方法
   */
  interceptResponse(onFulfilled?: IFetcherInterceptResponseFulfilled, onRejected?: IFetcherInterceptResponseRejected, priority?: number): IInterceptorEject;
  
  /**
   * 对于「开箱即用」的 fetcher，因为它是会被复用的单例，所以一般不希望它的拦截器被扩展，如果还是坚持要扩展，需要手动解除
   */
  sealInterceptors(requestSealed?: boolean, responseSealed?: boolean): void;
}

export interface IFetcher extends Pick<IFetcherClassType, 'interceptRequest' | 'interceptResponse' | 'sealInterceptors' | 'request'> {
  jsonp: IFetcherCallJsonp;
  get: IFetcherCallGetAlike;
  post: IFetcherCallPostAlike;
  put: IFetcherCallPostAlike;
  patch: IFetcherCallPostAlike;
  delete: IFetcherCallPostAlike;
}