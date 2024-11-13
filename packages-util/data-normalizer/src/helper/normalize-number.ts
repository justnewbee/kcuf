/**
 * 标准化数值
 */
export default function normalizeNumber(value: unknown, fallback = 0): number {
  return Number(value) || fallback;
}
