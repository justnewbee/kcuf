import _isError from 'lodash/isError';

import {
  FetchErrorName
} from '@kcuf/fetcher-fetch';
import {
  JsonpErrorName
} from '@kcuf/fetcher-jsonp';

import {
  IFetcherConfig,
  IFetcherError
} from '../types';
import {
  EFetcherErrorName
} from '../enum';

/**
 * 确保任何错误（包括 undefined 等）都转成 FetcherError，填入 config，并把 fetcher-fetch 和 fetcher-jsonp 的错误 name 转成 fetcher 的
 *
 * 曾经利用过 Error 的继承，但效果不好.. 有兴趣可以看看
 *   如何自定义错误 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 *
 * 其中一个问题是没有办法（或者我不知道怎么弄）给自定义的 Error 类添加 toJSON 方法（写在 prototype 里无法继承，只能写在实例上）
 * 所以最终选择了工厂模式
 */
export default function convertError(err: unknown, config: IFetcherConfig): IFetcherError {
  const error = (_isError(err) ? err : new Error(String(err || ''))) as IFetcherError;
  
  error.config = config;
  
  switch (error.name) {
    case FetchErrorName.NETWORK:
    case JsonpErrorName.NETWORK:
      error.name = EFetcherErrorName.NETWORK;
      
      break;
    case FetchErrorName.TIMEOUT:
    case JsonpErrorName.TIMEOUT:
      error.name = EFetcherErrorName.TIMEOUT;
      
      break;
    default:
      break;
  }
  
  // 所以 AbortError 的名字依然是 AbortError
  return error;
}
