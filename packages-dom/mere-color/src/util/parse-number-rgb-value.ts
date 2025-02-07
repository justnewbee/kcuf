/**
 * 将 `rgb(r g b)` 中的 r/g/b 值转换成整数，考虑到百分比的场景
 */
export default function parseNumberRgbValue(value: string, percentageUnit?: string): number {
  return Number(value) * (percentageUnit ? 255 / 100 : 1);
}
