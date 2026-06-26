import _forEach from 'lodash/forEach';

export default function cloneTypeSearchParams(o: Record<string, unknown> | URLSearchParams): URLSearchParams {
  const searchParams = new URLSearchParams();
  
  if (o instanceof URLSearchParams) {
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
