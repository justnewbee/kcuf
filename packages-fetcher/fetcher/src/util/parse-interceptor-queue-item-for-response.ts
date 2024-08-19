import {
  IInterceptorQueueItemResponse,
  TInterceptResponseArgs
} from '../types';

export default function parseInterceptorQueueItemForResponse<T = unknown, D = T>(args: TInterceptResponseArgs<T, D>): IInterceptorQueueItemResponse<T, D> {
  if (typeof args[0] === 'number') {
    return {
      priority: args[0],
      onFulfilled: args[1],
      onRejected: args[2]
    };
  }
  
  return {
    onFulfilled: args[0],
    onRejected: args[1]
  };
}