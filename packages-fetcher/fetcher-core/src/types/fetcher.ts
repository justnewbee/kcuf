import {
  IFetcherConfig
} from './config';
import {
  TFetcherHeadersNormalized
} from './config-headers';
import {
  TFetcherBodyNormalized
} from './config-body';
import {
  IFetcherResponse
} from './fetcher-response';
import {
  TInterceptorEject,
  TFetcherInterceptRequest,
  TFetcherInterceptResponseFulfilled,
  TFetcherInterceptResponseRejected
} from './fetcher-interceptor';
import {
  IFetcherCallGetAlike,
  IFetcherCallJsonp,
  IFetcherCallPostAlike
} from './fetcher-fn';

/**
 * 真正调用 adapter 执行网络请求前，Fetcher 会处理好完整的请求地址、标准的 Headers 和标准的 body（有的话），adapter 只需要安心使用即可
 */
export type TFetcherAdapter = <T>(url: string, headers: TFetcherHeadersNormalized, body: TFetcherBodyNormalized, config: IFetcherConfig) => Promise<IFetcherResponse<T>>;

export interface IFetcherClass {
  /**
   * 发送请求：前置请求拦截器 → 网络请求 → 后置响应拦截器
   */
  request<T = unknown>(config: IFetcherConfig): Promise<T>;
  
  /**
   * 添加「预设」请求拦截器，返回解除拦截的无参方法
   */
  interceptRequest(onFulfilled: TFetcherInterceptRequest, priority?: number): TInterceptorEject;
  
  /**
   * 添加「预设」响应拦截器，返回解除拦截的无参方法
   */
  interceptResponse(onFulfilled?: TFetcherInterceptResponseFulfilled, onRejected?: TFetcherInterceptResponseRejected, priority?: number): TInterceptorEject;
  
  /**
   * 对于「开箱即用」的 fetcher，因为它是会被复用的单例，所以一般不希望它的拦截器被扩展，如果还是坚持要扩展，需要手动解除
   */
  sealInterceptors(requestSealed?: boolean, responseSealed?: boolean): void;
}

export interface IFetcher extends Pick<IFetcherClass, 'interceptRequest' | 'interceptResponse' | 'sealInterceptors' | 'request'> {
  jsonp: IFetcherCallJsonp;
  get: IFetcherCallGetAlike;
  post: IFetcherCallPostAlike;
  put: IFetcherCallPostAlike;
  patch: IFetcherCallPostAlike;
  delete: IFetcherCallPostAlike;
}
