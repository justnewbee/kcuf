import {
  FetcherErrorName,
  FetcherConfig,
  FetcherInterceptResponseFulfilled,
  createFetcherError
} from '@kcuf/fetcher';

import {
  TResponseResult,
  IFetcherInterceptBizOptions
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
export default function createInterceptorResponseFulfilled(options?: IFetcherInterceptBizOptions): FetcherInterceptResponseFulfilled {
  return (o: unknown, fetcherConfig: FetcherConfig): unknown => {
    const result = o as TResponseResult;
    const success = isResponseSuccess(result, fetcherConfig.isSuccess ?? options?.isSuccess);
    
    if (success) {
      return getDataFromResponse(result, fetcherConfig.getData ?? options?.getData);
    }
    
    throw createFetcherError(fetcherConfig, FetcherErrorName.BIZ, getErrorMessage(result, fetcherConfig.getMessage ?? options?.getMessage) || '', {
      code: getErrorCode(result, fetcherConfig.getCode ?? options?.getCode) || '__UNKNOWN__',
      title: getErrorTitle(result, fetcherConfig.getTitle ?? options?.getTitle)
    });
  };
}
