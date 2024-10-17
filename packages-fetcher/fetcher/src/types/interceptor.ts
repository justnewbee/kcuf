import {
  IFetcherResponse
} from './common';
import {
  IFetcherConfig
} from './config';
import {
  IFetcherError
} from './error';
import {
  IFetcherCallRequest
} from './fn';

export type TFetcherInterceptRequestReturn = undefined | IFetcherConfig | Promise<undefined | IFetcherConfig> | never;

/**
 * Request interceptor 方法类型
 */
export interface IFetcherInterceptRequest {
  (fetcherConfig: IFetcherConfig, callRequest: IFetcherCallRequest): TFetcherInterceptRequestReturn;
}

/**
 * Response success interceptor 方法类型
 *  - T - 最终需要返回的 Promise 类型
 *  - D - 接口实际返回的 Promise 类型
 */
export interface IFetcherInterceptResponseFulfilled<T = unknown, D = T> {
  (data: D, fetcherConfig: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: IFetcherCallRequest): T | never;
}

/**
 * Response error interceptor 方法类型
 */
export interface IFetcherInterceptResponseRejected<T = unknown> {
  (error: IFetcherError, fetcherConfig: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: IFetcherCallRequest): T | never;
}

export interface IInterceptorQueueItemBase {
  priority?: number;
}

export interface IInterceptorQueueItemRequest extends IInterceptorQueueItemBase {
  onFulfilled?: IFetcherInterceptRequest;
}

export interface IInterceptorQueueItemResponse extends IInterceptorQueueItemBase {
  onFulfilled?: IFetcherInterceptResponseFulfilled;
  onRejected?: IFetcherInterceptResponseRejected;
}
