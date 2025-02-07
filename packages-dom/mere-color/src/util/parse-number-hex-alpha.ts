import parseNumberHex from './parse-number-hex';

/**
 * `#RGBA` 中的 A 转成 0-100 的数值
 */
export default function parseNumberHexAlpha(str: string): number | undefined {
  if (!str) {
    return undefined;
  }
  
  return parseNumberHex(str) / 255 * 100;
}
