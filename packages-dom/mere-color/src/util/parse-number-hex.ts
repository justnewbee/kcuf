import _clamp from 'lodash/clamp';

/**
 * `#RGBA` 中的 R/G/B 转成 0-255 的数值
 */
export default function parseNumberHex(str: string): number {
  if (!str) {
    return 0;
  }
  
  return _clamp(parseInt(str.length === 1 ? str.repeat(2) : str, 16), 0, 255);
}
