/**
 * 将随性的值转成布尔
 */
export default function normalizeBoolean(value: number | string): boolean {
  return [1, '1', 'true', 'TRUE'].includes(value);
}
