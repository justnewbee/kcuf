import {
  IFetcherBodySerializeOptions, IFetcherParamsSerializeOptions
} from '../types';

export const DEFAULT_SERIALIZE_BODY_OPTIONS: IFetcherBodySerializeOptions = {
  arrayFormat: 'repeat'
};

export const DEFAULT_SERIALIZE_PARAMS_OPTIONS: IFetcherParamsSerializeOptions = { // 默认 URL 参数序列化操作，qs 默认 a[0]=b&a[1]=c&a[2]=d，但我们需要 a=0&a=1&a=2
  indices: false
};
