import {
  IFetcherConfig
} from '../types';

import mergeUrlWithParams from './merge-url-with-params';
import mergeUrlWithUrlBase from './merge-url-with-url-base';

/**
 * GET 类参数需要放到 URL 的 search 部分，这里参数 **可能** 由以下组成：
 *
 *  - URL 中本身的 search，这部分是字符串
 *  - `params` 传入，一般是对象，但也有可能是字符串
 *
 * 这里，将以上参数混合在一起，生成一个新 URL
 */
export default function buildUrl(config: IFetcherConfig): string {
  const {
    url = '',
    urlBase,
    params,
    serializeParams: serializeParamsOptions
  } = config;
  
  return mergeUrlWithUrlBase(mergeUrlWithParams(url, params, serializeParamsOptions), urlBase);
}
