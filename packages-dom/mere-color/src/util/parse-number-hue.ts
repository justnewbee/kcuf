/**
 * Valid CSS <angle> units.
 *
 * 360 deg = 1 turn = 400 grad = 2π rad
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 */
const ANGLE_UNITS: Record<string, number> = {
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2)
};

/**
 * 将 HSL 中的 Hue 转成 0-359 的数值
 */
export default function parseNumberHue(value: string, unit = 'deg'): number {
  return Number(value) * (ANGLE_UNITS[unit] || 1);
}
