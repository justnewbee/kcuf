import {
  EFetcherErrorName
} from '../enum';

import {
  IFetcherConfig
} from './config';

/**
 * Adapter 可能有或没有自己的错误名称定义，又需要的时候，应尽可能标准化为 Fetcher 定义好的名称
 */
export type TErrorNameNormalizer = (errName: string) => EFetcherErrorName | undefined;

export interface IErrorExtendedInfo {
  /**
   * 预留扩展字段 - 错误码
   */
  code?: string;
  /**
   * 预留扩展字段 - 错误标题
   */
  title?: string;
  /**
   * 预留扩展字段 - 原始 response 中的数据；强行把返回变成出错时需要
   */
  responseData?: unknown;
}

/**
 * 错误
 */
export interface IFetcherError extends Error, IErrorExtendedInfo {
  config?: IFetcherConfig;
}

/**
 * 特殊错误，用于绕过网络请求，直接返回 `result`，在某些拦截器中可以用到
 */
export interface IFetcherErrorSkipNetwork<T = void> extends IFetcherError {
  name: 'FetcherSkipNetwork';
  result: T | Promise<T>;
}
