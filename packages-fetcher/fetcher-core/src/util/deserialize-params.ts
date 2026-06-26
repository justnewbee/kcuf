import qs from 'qs';

import {
  IFetcherBodySerializeOptions
} from '../types';
import {
  DEFAULT_SERIALIZE_PARAMS_OPTIONS
} from '../const';

export default function deserializeParams(params: string, options: IFetcherBodySerializeOptions = DEFAULT_SERIALIZE_PARAMS_OPTIONS): Record<string, unknown> {
  return qs.parse(params, options);
}
