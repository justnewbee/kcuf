import {
  ICookieDeleteOptions
} from './types';
import cookieSet from './cookie-set';

/**
 * 删除 Cookie，其实设置一个过期时间为此刻之前的时间，浏览器会自动清理过期的 Cookie（所以这里设不设值都无所谓）
 */
export default function cookieDelete(name: string, {
  domain,
  path
}: ICookieDeleteOptions = {}): void {
  cookieSet(name, '', {
    domain,
    path,
    days: -1
  });
}
