import {
  TFetcherHeaders
} from '../types';

import isInstanceofHeaders from './is-instanceof-headers';
import headersNormalize from './headers-normalize';
import cloneTypeHeaders from './clone-type-headers';
import mergeTypeHeaders from './merge-type-headers';

export default function mergeHeaders(headers1: TFetcherHeaders, headers2: TFetcherHeaders): TFetcherHeaders {
  if (isInstanceofHeaders(headers1) || isInstanceofHeaders(headers2)) {
    return mergeTypeHeaders(cloneTypeHeaders(headers1), cloneTypeHeaders(headers2));
  }
  
  return {
    ...headersNormalize(headers2),
    ...headersNormalize(headers1)
  };
}
