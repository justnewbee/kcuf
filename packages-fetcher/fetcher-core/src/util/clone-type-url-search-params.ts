import _forEach from 'lodash/forEach';

import isInstanceofUrlSearchParams from './is-instanceof-url-search-params';

export default function cloneTypeUrlSearchParams(o: Record<string, unknown> | URLSearchParams): URLSearchParams {
  const searchParams = new URLSearchParams();
  
  if (isInstanceofUrlSearchParams(o)) {
    o.forEach((v, k) => {
      searchParams.append(k, v);
    });
  } else {
    _forEach(o, (v, k) => {
      searchParams.append(k, v as string);
    });
  }
  
  return searchParams;
}
