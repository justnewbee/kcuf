import {
  TFetcherHeaders
} from '../types';

import isInstanceofHeaders from './is-instanceof-headers';
import normalizeHeaders from './normalize-headers';
import cloneTypeHeaders from './clone-type-headers';
import mergeTypeHeaders from './merge-type-headers';

export default function mergeHeaders(headers1: TFetcherHeaders, headers2: TFetcherHeaders): TFetcherHeaders {
  if (isInstanceofHeaders(headers1) || isInstanceofHeaders(headers2)) {
    return mergeTypeHeaders(cloneTypeHeaders(headers1), cloneTypeHeaders(headers2));
  }
  
  return {
    ...normalizeHeaders(headers2),
    ...normalizeHeaders(headers1)
  };
}
