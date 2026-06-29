import {
  TFetcherHeadersNormalized
} from '../types';

import isInstanceofHeaders from './is-instanceof-headers';

export default function headersDelete(headers: TFetcherHeadersNormalized, key: string): void {
  if (isInstanceofHeaders(headers)) {
    headers.delete(key);
  } else {
    delete headers[key]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
  }
}
