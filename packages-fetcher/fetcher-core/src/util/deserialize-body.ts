import qs from 'qs';

import {
  IFetcherBodySerializeOptions
} from '../types';
import {
  DEFAULT_SERIALIZE_BODY_OPTIONS
} from '../const';

export default function deserializeBody(body: string, options: IFetcherBodySerializeOptions = DEFAULT_SERIALIZE_BODY_OPTIONS): Record<string, unknown> {
  return qs.parse(body, options);
}
