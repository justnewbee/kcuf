import normalizeHexValue from './normalize-hex-value';

/**
 * 将 `rgb(r g b)` 中的 r/g/b 值转换成 `[0-255]` 的整数，考虑到百分比的场景。
 */
export default function parseNumberRgbValue(value: string, percentageUnit?: string): number {
  return normalizeHexValue(Number(value) * (percentageUnit ? 255 / 100 : 1));
}
