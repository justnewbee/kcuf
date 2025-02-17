import {
  REG_ATOB,
  B64TAB
} from '../const';

const {
  fromCharCode
} = String;

function atobPolyfill(a: string): string {
  return a.replace(REG_ATOB, v => {
    const len = v.length;
    const padLen = len % 4;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const n = (len > 0 ? B64TAB[v.charAt(0)]! << 18 : 0) | (len > 1 ? B64TAB[v.charAt(1)]! << 12 : 0) | (len > 2 ? B64TAB[v.charAt(2)]! << 6 : 0) | (len > 3 ? B64TAB[v.charAt(3)]! : 0);
    const chars = [
      fromCharCode(n >>> 16),
      fromCharCode((n >>> 8) & 0xff),
      fromCharCode(n & 0xff)
    ];
    
    chars.length -= [0, 0, 2, 1][padLen]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    
    return chars.join('');
  });
}

export default typeof window !== 'undefined' && window.atob ? window.atob : atobPolyfill;
