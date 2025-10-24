import cookieAll from './cookie-all';

/**
 * 获取单个 Cookie
 */
export default function cookieGet(name: string): string | undefined {
  return cookieAll()[name];
}
