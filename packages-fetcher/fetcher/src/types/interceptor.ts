import {
  IFetcherFnRequest
} from './fn';
import {
  IFetcherResponse
} from './response';
import {
  IFetcherConfig
} from './config';
import {
  IFetcherError
} from './error';

export interface IInterceptorRemover {
  (): void;
}

export type TFetcherInterceptRequestReturn = undefined | IFetcherConfig | Promise<undefined | IFetcherConfig> | never;

/**
 * Request interceptor 方法类型
 */
export interface IFetcherInterceptorRequest {
  (fetcherConfig: IFetcherConfig, requestFn: IFetcherFnRequest): TFetcherInterceptRequestReturn;
}

/**
 * Response success interceptor 方法类型
 *  - T - 最终需要返回的 Promise 类型
 *  - D - 接口实际返回的 Promise 类型
 */
export interface IFetcherInterceptorResponseFulfilled<T = unknown, D = T> {
  (data: D, fetcherConfig: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: IFetcherFnRequest): T | never;
}

/**
 * Response error interceptor 方法类型
 */
export interface IFetcherInterceptorResponseRejected<T = unknown> {
  (error: IFetcherError, fetcherConfig: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: IFetcherFnRequest): T | never;
}

export interface IInterceptorQueueItemBase {
  priority?: number;
}

export interface IInterceptorQueueItemRequest extends IInterceptorQueueItemBase {
  onFulfilled?: IFetcherInterceptorRequest;
}

export interface IInterceptorQueueItemResponse<T = unknown, D = T> extends IInterceptorQueueItemBase {
  onFulfilled?: IFetcherInterceptorResponseFulfilled<T, D>;
  onRejected?: IFetcherInterceptorResponseRejected<T>;
}