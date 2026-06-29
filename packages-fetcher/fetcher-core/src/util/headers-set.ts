import {
  TFetcherHeadersNormalized
} from '../types';

import isInstanceofHeaders from './is-instanceof-headers';

export default function headersSet(headers: TFetcherHeadersNormalized, key: string, value: string): void {
  if (isInstanceofHeaders(headers)) {
    headers.set(key, value);
  } else {
    headers[key] = value;
  }
}
