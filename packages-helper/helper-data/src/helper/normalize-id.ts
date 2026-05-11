/**
 * 标准化 ID 值
 */
export default function normalizeId(id0: unknown): string {
  if (!id0) { // 0 '' null undefined NaN...
    return '';
  }
  
  if (typeof id0 === 'string') {
    return id0;
  }
  
  if (typeof id0 === 'number') {
    return id0.toString();
  }
  
  return '';
}
