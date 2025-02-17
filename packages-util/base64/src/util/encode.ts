import btoa from './btoa';
import utob from './utob';

/**
 * 支持 unicode 的 Base64 编码，如果 `uriSafe` 为 `true`，则末尾的 `=` 会被抹掉，`+` 转成 `-`
 */
export default function encode(str: string, uriSafe?: boolean): string {
  const base64Str = btoa(utob(str));
  
  return uriSafe ? base64Str.replace(/[+/]/g, m0 => (m0 === '+' ? '-' : '_')).replace(/=/g, '') : base64Str;
}
