import parseNumberHex from './parse-number-hex';
import normalizePercentage from './normalize-percentage';

/**
 * `#RGBA` 中的 A 转成 0-100 的数值
 */
export default function parseNumberHexAlpha(str: string): number | undefined {
  if (!str) {
    return undefined;
  }
  
  return normalizePercentage(parseNumberHex(str) / 255 * 100);
}
