import _isError from 'lodash/isError';

import normalizeError from './normalize-error';
import normalizeHeaders from './normalize-headers';
import normalizeFile from './normalize-file';
import normalizeFormData from './normalize-form-data';
import normalizeSearchParams from './normalize-search-params';

export default function normalizePayload(o: object): object {
  if (_isError(o)) {
    return normalizeError(o);
  }
  
  if (o instanceof Headers) {
    return normalizeHeaders(o);
  }
  
  if (o instanceof File) {
    return normalizeFile(o);
  }
  
  if (o instanceof FormData) {
    return normalizeFormData(o);
  }
  
  if (o instanceof URLSearchParams) {
    return normalizeSearchParams(o);
  }
  
  return o;
}