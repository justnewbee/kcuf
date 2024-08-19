import {
  FetcherErrorName,
  FetcherConfig,
  FetcherFnInterceptResponseFulfilled,
  createFetcherError
} from '@kcuf/fetcher';

import {
  IFetcherInterceptBizOptions,
  TResponseResult
} from '../types';

import isResponseSuccess from './is-response-success';
import getDataFromResponse from './get-data-from-response';
import getErrorCode from './get-error-code';
import getErrorTitle from './get-error-title';
import getErrorMessage from './get-error-message';

/**
 * 请求到这里，说明服务端有返回，但业务上不一定是成功的。
 * 这里会判断业务是否成功，如果成功则返回从原屎返回中得出的真正的数据，如果失败在抛出 FetchErrorBiz。
 */
export default function createInterceptorResponseFulfilled(options?: IFetcherInterceptBizOptions): FetcherFnInterceptResponseFulfilled<unknown, TResponseResult> {
  return (o: TResponseResult, fetcherConfig: FetcherConfig): unknown => {
    const success = isResponseSuccess(o, fetcherConfig.isSuccess ?? options?.isSuccess);
    
    if (success) {
      return getDataFromResponse(o, fetcherConfig.getData ?? options?.getData);
    }
    
    throw createFetcherError(fetcherConfig, FetcherErrorName.BIZ, getErrorMessage(o, fetcherConfig.getMessage ?? options?.getMessage) || '', {
      code: getErrorCode(o, fetcherConfig.getCode ?? options?.getCode) || '__UNKNOWN__',
      title: getErrorTitle(o, fetcherConfig.getTitle ?? options?.getTitle)
    });
  };
}
