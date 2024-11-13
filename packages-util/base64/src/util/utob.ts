import {
  REG_UTOB
} from '../const';

const {
  fromCharCode
} = String;

/**
 * unicode 版解码
 */
export default function utob(u: string): string {
  return u.replace(REG_UTOB, v => {
    if (v.length < 2) {
      const cc = v.charCodeAt(0);
      
      return cc < 0x80 ? v : cc < 0x800 ? fromCharCode(0xc0 | (cc >>> 6)) + fromCharCode(0x80 | (cc & 0x3f)) : fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) + fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) + fromCharCode(0x80 | (cc & 0x3f));
    }
    
    const cc = 0x10000 + (v.charCodeAt(0) - 0xD800) * 0x400 + (v.charCodeAt(1) - 0xDC00);
    
    return fromCharCode(0xf0 | ((cc >>> 18) & 0x07)) + fromCharCode(0x80 | ((cc >>> 12) & 0x3f)) + fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) + fromCharCode(0x80 | (cc & 0x3f));
  });
}
