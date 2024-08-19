import {
  EFetcherErrorName
} from '../enum';

import {
  IFetcherConfig
} from './config';

export interface IFetcherErrorExtendedInfo {
  /**
   * 预留扩展字段 - 错误标题
   */
  title?: string;
  /**
   * 预留扩展字段 - 错误码
   */
  code?: string;
  /**
   * 预留扩展字段 - 原始 response 中的数据；强行把返回变成出错时需要
   */
  responseData?: unknown;
}

/**
 * 错误
 */
export interface IFetcherError extends Error, IFetcherErrorExtendedInfo {
  config?: IFetcherConfig;
}

/**
 * 特殊错误，用于绕过网络请求
 */
export interface IFetcherErrorSpecial<T = void> extends Error {
  name: EFetcherErrorName;
  config?: IFetcherConfig;
  result: T | Promise<T>;
}