import {
  IErrorExtendedInfo
} from './common';
import {
  IFetcherConfig
} from './config';

/**
 * 错误
 */
export interface IFetcherError extends Error, IErrorExtendedInfo {
  config?: IFetcherConfig;
}

/**
 * 特殊错误，用于绕过网络请求，直接返回 `result`，在某些拦截器中可以用到
 */
export interface IFetcherErrorSkipNetwork<T = void> extends Error {
  name: 'FetcherSkipNetwork';
  config?: IFetcherConfig;
  result: T | Promise<T>;
}
