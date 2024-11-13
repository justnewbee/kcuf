import _forEach from 'lodash/forEach';

/**
 * Error 身上的 name、message、stack 等信息用 _forEach 遍历不到，故需要转成普通对象
 */
export default function normalizeError(err: Error): Record<string, unknown> {
  const normalized: Record<string, unknown> = {
    name: err.name,
    message: err.message
  };
  
  _forEach(err, (v, k) => {
    normalized[k] = v;
  });
  
  return normalized;
}
