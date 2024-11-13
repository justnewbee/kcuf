export default function normalizeHeaders(headers: Headers): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  
  headers.forEach((v, k) => {
    normalized[k] = v;
  });
  
  return normalized;
}
