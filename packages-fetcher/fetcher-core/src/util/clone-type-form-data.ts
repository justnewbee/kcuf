import _forEach from 'lodash/forEach';

import isInstanceofFormData from './is-instanceof-form-data';
import isInstanceofUrlSearchParams from './is-instanceof-url-search-params';

export default function cloneTypeFormData(o: Record<string, unknown> | URLSearchParams | FormData): FormData {
  const formData = new FormData();
  
  if (isInstanceofFormData(o) || isInstanceofUrlSearchParams(o)) {
    o.forEach((v, k) => {
      formData.append(k, v);
    });
  } else {
    _forEach(o, (v, k) => {
      formData.append(k, v as string);
    });
  }
  
  return formData;
}
