import {
  IInterceptorQueueItemRequest,
  TInterceptRequestArgs
} from '../types';

export default function parseInterceptorQueueItemForRequest(args: TInterceptRequestArgs): IInterceptorQueueItemRequest {
  if (typeof args[0] === 'number') {
    return {
      priority: args[0],
      onFulfilled: args[1]
    };
  }
  
  return {
    onFulfilled: args[0]
  };
}