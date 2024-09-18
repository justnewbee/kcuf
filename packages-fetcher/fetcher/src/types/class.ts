import {
  IFetcherConfig
} from './config';
import {
  IFetcherInterceptorRequest,
  IFetcherInterceptorResponseFulfilled,
  IFetcherInterceptorResponseRejected,
  IInterceptorRemover
} from './interceptor';

export interface IFetcherClassType {
  /**
   * 发送请求：前置请求拦截器 → 网络请求 → 后置响应拦截器
   */
  request<T = void>(fetcherConfig: IFetcherConfig): Promise<T>;
  
  interceptRequest(fn: IFetcherInterceptorRequest): IInterceptorRemover;
  interceptRequest(priority: number, fn: IFetcherInterceptorRequest): IInterceptorRemover;
  
  interceptResponse<T = unknown, D = T>(onFulfilled: IFetcherInterceptorResponseFulfilled<T, D>): IInterceptorRemover;
  interceptResponse<T = unknown, D = T>(onFulfilled: IFetcherInterceptorResponseFulfilled<T, D>, onRejected: IFetcherInterceptorResponseRejected<T>): IInterceptorRemover;
  interceptResponse<T = unknown>(onFulfilled: undefined, onRejected: IFetcherInterceptorResponseRejected<T>): IInterceptorRemover;
  interceptResponse<T = unknown, D = T>(priority: number, onFulfilled: IFetcherInterceptorResponseFulfilled<T, D>): IInterceptorRemover;
  interceptResponse<T = unknown, D = T>(priority: number, onFulfilled: IFetcherInterceptorResponseFulfilled<T, D>, onRejected: IFetcherInterceptorResponseRejected<T>): IInterceptorRemover;
  interceptResponse<T = unknown>(priority: number, onFulfilled: undefined, onRejected: IFetcherInterceptorResponseRejected<T>): IInterceptorRemover;
  
  /**
   * 对于「开箱即用」的 fetcher，因为它是会被复用的单例，所以一般不希望它的拦截器被扩展，如果还是坚持要扩展，需要手动解除
   */
  sealInterceptors(requestSealed?: boolean, responseSealed?: boolean): void;
}