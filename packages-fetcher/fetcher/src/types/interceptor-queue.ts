import {
  IFetcherInterceptRequest,
  IFetcherInterceptResponseFulfilled,
  IFetcherInterceptResponseRejected
} from './config';

export interface IInterceptorQueueItemBase {
  priority?: number;
}

export interface IInterceptorQueueItemRequest extends IInterceptorQueueItemBase {
  onFulfilled?: IFetcherInterceptRequest;
}

export interface IInterceptorQueueItemResponse<T = unknown, D = T> extends IInterceptorQueueItemBase {
  onFulfilled?: IFetcherInterceptResponseFulfilled<T, D>;
  onRejected?: IFetcherInterceptResponseRejected<T>;
}