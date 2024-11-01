export default function normalizeSearchParams(searchParams: URLSearchParams): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  
  searchParams.forEach((v, k) => {
    const exist = normalized[k];
    
    if (Array.isArray(exist)) {
      exist.push(v);
    } else if (exist) {
      normalized[k] = [exist, v];
    } else {
      normalized[k] = v;
    }
  });
  
  return normalized;
}