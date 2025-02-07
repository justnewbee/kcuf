/**
 * `#RGBA` 中的 R/G/B 转成整数
 */
export default function parseNumberHex(str: string): number {
  if (!str) {
    return 0;
  }
  
  return parseInt(str.length === 1 ? str.repeat(2) : str, 16);
}
