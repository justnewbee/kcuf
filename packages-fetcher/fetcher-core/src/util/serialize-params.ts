import qs from 'qs';

import {
  TFetcherParams,
  ISerializeBodyOptions,
  ISerializeParamsOptions
} from '../types';

const DEFAULT_OPTIONS: ISerializeParamsOptions = { // 默认 URL 参数序列化操作，qs 默认 a[0]=b&a[1]=c&a[2]=d，但我们需要 a=0&a=1&a=2
  indices: false
};

export default function serializeParams(params: TFetcherParams, options: ISerializeParamsOptions = DEFAULT_OPTIONS): string {
  if (!params) {
    return '';
  }
  
  if (typeof params === 'string') {
    return params;
  }
  
  if (params instanceof URLSearchParams) {
    return params.toString();
  }
  
  return qs.stringify(params, options);
}

export function deserializeParams(params: string, options: ISerializeBodyOptions = DEFAULT_OPTIONS): Record<string, unknown> {
  return qs.parse(params, options);
}
