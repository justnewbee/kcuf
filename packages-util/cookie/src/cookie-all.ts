/**
 * 获取当前页面可以访问到的全部 Cookie
 *
 * 注意，如果是私生 Cookie，尤其是设置的值为 `escape` 的中文，这里可能会得不到
 */
export default function cookieAll(): Record<string, string> {
  if (typeof document === 'undefined' || !document.cookie) { // for SSR
    return {};
  }
  
  return document.cookie.split(/\s*;\s*/).reduce((result: Record<string, string>, v) => {
    const [cookieName, cookieValue] = v.split('=') as [string, string];
    
    // `decodeURIComponent` 需要做保护，比如 `decodeURIComponent(escape('中文'))` j就会抛错「URIError: malformed URI sequence」，
    // 注意，我们不做 `unescape` 兼容
    try {
      result[cookieName] = decodeURIComponent(cookieValue);
    } catch (_err) {
      // ignore
    }
    
    return result;
  }, {});
}
