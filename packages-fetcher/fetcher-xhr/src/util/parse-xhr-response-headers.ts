/**
 * Xhr getAllResponseHeaders 返回的是字符串，解析成 Headers 对象，以对标 fetch
 *
 * 一个例子：
 *
 * ```
 * cache-control: no-cache, no-store, max-age=0, must-revalidate
 * content-type: application/json
 * expires: 0
 * pragma: no-cache
 * ```
 */
export default function parseResponseHeaders(xhrAllHeaders: string): Headers {
  return xhrAllHeaders.split('\n').reduce((result, headerPair) => {
    const arr = headerPair.trim().split(': ');
    const [k, v] = arr;
    
    if (k && v) {
      result.append(k, v);
    }
    
    return result;
  }, new Headers());
}
