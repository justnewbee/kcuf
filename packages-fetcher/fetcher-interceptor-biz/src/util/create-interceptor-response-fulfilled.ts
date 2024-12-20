import _isPlainObject from 'lodash/isPlainObject';

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
  return (o: unknown, config: FetcherConfig): unknown => {
    if (!_isPlainObject(o)) { // 绕过非对象，比如 Blob、ArrayBuffer 等
      return o;
    }
    
    const result = o as TResponseResult;
    const success = isResponseSuccess(result, config.isSuccess ?? options?.isSuccess);
    
    if (success) {
      return getDataFromResponse(result, config.getData ?? options?.getData);
    }
    
    throw createFetcherError(config, FetcherErrorName.BIZ, getErrorMessage(result, config.getMessage ?? options?.getMessage) || '', {
      code: getErrorCode(result, config.getCode ?? options?.getCode) || '__UNKNOWN__',
      title: getErrorTitle(result, config.getTitle ?? options?.getTitle)
    });
  };
}
