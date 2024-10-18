import _forEach from 'lodash/forEach';

export default function cloneTypeFormData(o: Record<string, unknown> | URLSearchParams | FormData): FormData {
  const formData = new FormData();
  
  if (o instanceof FormData || o instanceof URLSearchParams) {
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