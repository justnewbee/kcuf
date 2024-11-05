/**
 * 标准化 ID 值
 */
export default function normalizeId(id0: unknown): string {
  if (typeof id0 === 'string') {
    return id0;
  }
  
  if (typeof id0 === 'number' && id0 > 0) {
    return id0.toString();
  }
  
  return '';
}