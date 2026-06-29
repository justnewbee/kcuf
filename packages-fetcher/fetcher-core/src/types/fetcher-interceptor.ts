import {
  IFetcherConfig,
  TFetcherConfigX
} from './config';
import {
  IFetcherResponse
} from './fetcher-response';
import {
  IFetcherError
} from './fetcher-error';
import {
  TFetcherFnRequest
} from './fetcher-fn';

export type TInterceptorEject = () => void;

export type TFetcherInterceptRequestReturn<X = object> = undefined | TFetcherConfigX<X> | Promise<undefined | TFetcherConfigX<X>>;

/**
 * Request interceptor 方法类型
 */
export type TFetcherInterceptRequest<X = object> = (config: TFetcherConfigX<X>, callRequest: TFetcherFnRequest<X>) => TFetcherInterceptRequestReturn<X>;

/**
 * Response success interceptor 方法类型
 *  - T - 最终需要返回的 Promise 类型
 *  - D - 接口实际返回的 Promise 类型
 */
export type TFetcherInterceptResponseFulfilled<T = unknown, D = T> = (data: D, config: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: TFetcherFnRequest) => T | never;

/**
 * Response error interceptor 方法类型
 */
export type TFetcherInterceptResponseRejected<T = unknown> = (error: IFetcherError, config: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: TFetcherFnRequest) => T | never;

export interface IInterceptorQueueItemBase {
  priority?: number;
}

export interface IInterceptorQueueItemRequest<X = object> extends IInterceptorQueueItemBase {
  onFulfilled?: TFetcherInterceptRequest<X>;
}

export interface IInterceptorQueueItemResponse extends IInterceptorQueueItemBase {
  onFulfilled?: TFetcherInterceptResponseFulfilled;
  onRejected?: TFetcherInterceptResponseRejected;
}
