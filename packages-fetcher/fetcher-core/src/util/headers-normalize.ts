import _forEach from 'lodash/forEach';
import _capitalize from 'lodash/capitalize';

import {
  TFetcherHeadersFallback,
  TFetcherHeadersFallbackNormalized
} from '../types';

/**
 * 关于 Headers 参考 https://developer.mozilla.org/en-US/docs/Web/API/Headers
 *
 * Headers 的 key 大小写无关，但比较标准的写法如 `Content-Type`，这里就是保证所有的 key 都是这种格式
 */
export default function headersNormalize(headers?: TFetcherHeadersFallback): TFetcherHeadersFallbackNormalized {
  const normalizedHeaders: TFetcherHeadersFallbackNormalized = {};
  
  _forEach(headers, (v, k) => {
    normalizedHeaders[k.split('-').map(_capitalize).join('-')] = typeof v === 'string' ? v : String(v);
  });
  
  return normalizedHeaders;
}
