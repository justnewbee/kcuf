import {
  IRemover
} from './common';
import {
  IFetcherConfig,
  IFetcherInterceptRequest,
  IFetcherInterceptResponseFulfilled,
  IFetcherInterceptResponseRejected
} from './config';

export interface IFetcherClassType {
  /**
   * 发送请求：前置请求拦截器 → 网络请求 → 后置响应拦截器
   */
  request<T = unknown>(fetcherConfig: IFetcherConfig): Promise<T>;
  
  interceptRequest(fn: IFetcherInterceptRequest): IRemover;
  interceptRequest(priority: number, fn: IFetcherInterceptRequest): IRemover;
  
  interceptResponse<T = unknown, D = T>(onFulfilled: IFetcherInterceptResponseFulfilled<T, D>): IRemover;
  interceptResponse<T = unknown, D = T>(onFulfilled: IFetcherInterceptResponseFulfilled<T, D>, onRejected: IFetcherInterceptResponseRejected<T>): IRemover;
  interceptResponse<T = unknown>(onFulfilled: undefined, onRejected: IFetcherInterceptResponseRejected<T>): IRemover;
  interceptResponse<T = unknown, D = T>(priority: number, onFulfilled: IFetcherInterceptResponseFulfilled<T, D>): IRemover;
  interceptResponse<T = unknown, D = T>(priority: number, onFulfilled: IFetcherInterceptResponseFulfilled<T, D>, onRejected: IFetcherInterceptResponseRejected<T>): IRemover;
  interceptResponse<T = unknown>(priority: number, onFulfilled: undefined, onRejected: IFetcherInterceptResponseRejected<T>): IRemover;
  
  /**
   * 对于「开箱即用」的 fetcher，因为它是会被复用的单例，所以一般不希望它的拦截器被扩展，如果还是坚持要扩展，需要手动解除
   */
  sealInterceptors(requestSealed?: boolean, responseSealed?: boolean): void;
}