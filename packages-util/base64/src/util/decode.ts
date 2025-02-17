import atob from './atob';
import btou from './btou';

/**
 * 支持 unicode 的 Base64 解码
 */
export default function decode(str: string): string {
  const strToDecode = str.replace(/[-_]/g, m0 => (m0 === '-' ? '+' : '/')).replace(/[^A-Za-z0-9+/]/g, '')
  
  return btou(atob(strToDecode));
}
