import {
  IHijackResult
} from '../types';
import {
  DATA_ROUTE_NOT
} from '../const';

export default function condition(el: HTMLElement): IHijackResult | void {
  // 忽略非连接、下载、有 target 的和带特定属性的
  if (el.tagName !== 'A' || el.getAttribute('download') || el.getAttribute('target') || el.hasAttribute(DATA_ROUTE_NOT)) {
    return;
  }
  
  const href = el.getAttribute('href');
  
  if (!href || /^(?:https?:)?\/\//.test(href)) { // 忽略没有 href 或 href 为绝对 URL
    return;
  }
  
  try {
    const url = new URL(href, location.href);
    
    if (url.protocol === location.protocol && url.host === location.host) {
      return {
        href,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    }
  } catch (_err) {
    // ignore
  }
}
