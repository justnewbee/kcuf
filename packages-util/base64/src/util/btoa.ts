import {
  REG_BTOA,
  CHARS
} from '../const';

function btoaPolyfill(b: string): string {
  return b.replace(REG_BTOA, v => {
    const padLen = [0, 2, 1][v.length % 3]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const ord = (v.charCodeAt(0) << 16) | ((v.length > 1 ? v.charCodeAt(1) : 0) << 8) | (v.length > 2 ? v.charCodeAt(2) : 0);
    
    return [
      CHARS.charAt(ord >>> 18),
      CHARS.charAt((ord >>> 12) & 63),
      padLen >= 2 ? '=' : CHARS.charAt((ord >>> 6) & 63),
      padLen >= 1 ? '=' : CHARS.charAt(ord & 63)
    ].join('');
  });
}

export default typeof window !== 'undefined' && window.btoa ? window.btoa : btoaPolyfill;
