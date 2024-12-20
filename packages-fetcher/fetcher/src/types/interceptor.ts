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
  TFetcherCallRequest
} from './fn';

export type TFetcherInterceptRequestReturn = undefined | IFetcherConfig | Promise<undefined | IFetcherConfig> | never;

/**
 * Request interceptor 方法类型
 */
export type TFetcherInterceptRequest = (config: IFetcherConfig, callRequest: TFetcherCallRequest) => TFetcherInterceptRequestReturn;

/**
 * Response success interceptor 方法类型
 *  - T - 最终需要返回的 Promise 类型
 *  - D - 接口实际返回的 Promise 类型
 */
export type TFetcherInterceptResponseFulfilled<T = unknown, D = T> = (data: D, config: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: TFetcherCallRequest) => T | never;

/**
 * Response error interceptor 方法类型
 */
export type TFetcherInterceptResponseRejected<T = unknown> = (error: IFetcherError, config: IFetcherConfig, fetcherResponse: IFetcherResponse<T> | undefined, fetcherRequest: TFetcherCallRequest) => T | never;

export interface IInterceptorQueueItemBase {
  priority?: number;
}

export interface IInterceptorQueueItemRequest extends IInterceptorQueueItemBase {
  onFulfilled?: TFetcherInterceptRequest;
}

export interface IInterceptorQueueItemResponse extends IInterceptorQueueItemBase {
  onFulfilled?: TFetcherInterceptResponseFulfilled;
  onRejected?: TFetcherInterceptResponseRejected;
}
