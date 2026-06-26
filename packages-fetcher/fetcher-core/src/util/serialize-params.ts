import qs from 'qs';

import {
  TFetcherParams,
  IFetcherParamsSerializeOptions
} from '../types';
import {
  DEFAULT_SERIALIZE_PARAMS_OPTIONS
} from '../const';

import isInstanceofUrlSearchParams from './is-instanceof-url-search-params';

export default function serializeParams(params: TFetcherParams, options: IFetcherParamsSerializeOptions = DEFAULT_SERIALIZE_PARAMS_OPTIONS): string {
  if (!params) {
    return '';
  }
  
  if (typeof params === 'string') {
    return params;
  }
  
  if (isInstanceofUrlSearchParams(params)) {
    return params.toString();
  }
  
  return qs.stringify(params, options);
}
