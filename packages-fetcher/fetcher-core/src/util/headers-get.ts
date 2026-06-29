import {
  TFetcherHeadersNormalized
} from '../types';

import isInstanceofHeaders from './is-instanceof-headers';

export default function headersGet(headers: TFetcherHeadersNormalized, key: string): string | null | undefined {
  return isInstanceofHeaders(headers) ? headers.get(key) : headers[key];
}
