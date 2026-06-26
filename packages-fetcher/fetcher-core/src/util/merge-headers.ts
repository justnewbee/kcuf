import {
  TFetcherHeaders
} from '../types';

import normalizeHeaders from './normalize-headers';
import cloneTypeHeaders from './clone-type-headers';
import mergeTypeHeaders from './merge-type-headers';

export default function mergeHeaders(headers1: TFetcherHeaders, headers2: TFetcherHeaders): TFetcherHeaders {
  if (headers1 instanceof Headers || headers2 instanceof Headers) {
    return mergeTypeHeaders(cloneTypeHeaders(headers1), cloneTypeHeaders(headers2));
  }
  
  return {
    ...normalizeHeaders(headers2),
    ...normalizeHeaders(headers1)
  };
}
