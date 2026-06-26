import {
  IInterceptorQueueItemRequest,
  IInterceptorQueueItemResponse
} from '../types';

import interceptRequestFirst from './intercept-request-first';
import interceptRequestFinal from './intercept-request-final';
import interceptResponseDownload from './intercept-response-download';

export const interceptorRequestFirst: IInterceptorQueueItemRequest = {
  onFulfilled: interceptRequestFirst
};

export const interceptorRequestFinal: IInterceptorQueueItemRequest = {
  onFulfilled: interceptRequestFinal
};

export const interceptorResponseDownload: IInterceptorQueueItemResponse = {
  onFulfilled: interceptResponseDownload
};
