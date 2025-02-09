import getAngleUnitValue from './get-angle-unit-value';

/**
 * 将 HSL 中的 Hue 转成 0-359 的数值
 */
export default function parseNumberHue(value: string, unit?: string): number {
  return Number(value) * getAngleUnitValue(unit);
}
