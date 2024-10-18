import qs from 'qs';

import {
  ISerializeParamsOptions,
  TFetcherParams
} from '../types';

import serializeParams from './serialize-params';
import mergeParams from './merge-params';

export default function mergeUrlWithParams(url: string, params?: TFetcherParams, options?: ISerializeParamsOptions): string {
  if (!params) {
    return url;
  }
  
  const searchIndex = url.indexOf('?');
  
  if (searchIndex < 0) {
    const paramsStr = serializeParams(params, options);
    
    return paramsStr ? `${url}?${paramsStr}` : url;
  }
  
  const urlPure = url.substring(0, searchIndex);
  const urlSearch = url.substring(searchIndex + 1);
  const mergedParams = mergeParams(qs.parse(urlSearch, options), typeof params === 'string' ? qs.parse(params, options) : params);
  const paramsStr = serializeParams(mergedParams, options);
  
  return paramsStr ? `${urlPure}?${paramsStr}` : url;
}