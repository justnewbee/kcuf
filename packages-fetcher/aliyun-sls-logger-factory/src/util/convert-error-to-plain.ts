import {
  forEach as _forEach
} from 'lodash-es';

/**
 * Error 身上的 name、message、stack 等信息用 _forEach 遍历不到，故需要转成普通对象
 */
export default function convertErrorToPlain(err: Error): Record<string, unknown> {
  const plainError: Record<string, unknown> = {
    name: err.name,
    message: err.message
  };
  
  _forEach(err, (v, k) => {
    plainError[k] = v;
  });
  
  return plainError;
}