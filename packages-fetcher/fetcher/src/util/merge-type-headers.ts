export default function mergeTypeHeaders(headers1: Headers, headers2: Headers): Headers {
  headers2.forEach((v, k) => {
    headers1.set(k, v); // 不 append
  });
  
  return headers1;
}
