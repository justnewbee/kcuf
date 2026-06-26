import qs from 'qs';

import {
  TFetcherBody,
  IFetcherBodySerializeOptions
} from '../types';
import {
  DEFAULT_SERIALIZE_BODY_OPTIONS
} from '../const';

import isInstanceofFormData from './is-instanceof-form-data';
import isInstanceofBlob from './is-instanceof-blob';
import isInstanceofUrlSearchParams from './is-instanceof-url-search-params';

/**
 * 默认简单数组 `a: [1, 2]` 会变成 `a[]=1&a[]=2`，而一般我们需要 `a=1&a=2`，所以默认使用 `arrayFormat: 'repeat'`
 * 但有的时候，复杂对象数组 `arr: [{a: xx, b, c}, ...]` 默认转成 arr[0][a]=xx 需要搞成 `arr[0].a=xx`，这个时候可以传 `{ allowDots: true }` 覆盖默认行为
 */
export default function serializeBody(body: TFetcherBody, options: IFetcherBodySerializeOptions = DEFAULT_SERIALIZE_BODY_OPTIONS): string | URLSearchParams | FormData | Blob {
  if (!body) {
    return '';
  }
  
  if (typeof body === 'string' || isInstanceofFormData(body) || isInstanceofBlob(body) || isInstanceofUrlSearchParams(body)) {
    return body;
  }
  
  return qs.stringify(body, options);
}
