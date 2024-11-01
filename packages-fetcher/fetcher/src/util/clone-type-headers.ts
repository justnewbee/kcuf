import _forEach from 'lodash/forEach';

import {
  TFetcherHeaders
} from '../types';

export default function cloneTypeHeaders(o: TFetcherHeaders): Headers {
  const headers = new Headers();
  
  if (o instanceof Headers) {
    o.forEach((v, k) => {
      headers.append(k, v);
    });
  } else {
    _forEach(o, (v, k) => {
      headers.append(k, v as string);
    });
  }
  
  return headers;
}