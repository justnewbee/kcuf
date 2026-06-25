import _isError from 'lodash/isError';

import normalizePayloadError from './normalize-payload-error';
import normalizePayloadHeaders from './normalize-payload-headers';
import normalizePayloadFile from './normalize-payload-file';
import normalizePayloadFormData from './normalize-payload-form-data';
import normalizePayloadSearchParams from './normalize-payload-search-params';

export default function normalizePayload(o: object): object {
  if (_isError(o)) {
    return normalizePayloadError(o);
  }
  
  if (typeof Headers !== 'undefined' && o instanceof Headers) { // 使用 typeof 以免在小程序等环境下崩坏
    return normalizePayloadHeaders(o);
  }
  
  if (typeof File !== 'undefined' && o instanceof File) {
    return normalizePayloadFile(o);
  }
  
  if (typeof FormData !== 'undefined' && o instanceof FormData) {
    return normalizePayloadFormData(o);
  }
  
  if (typeof URLSearchParams !== 'undefined' && o instanceof URLSearchParams) {
    return normalizePayloadSearchParams(o);
  }
  
  return o;
}
