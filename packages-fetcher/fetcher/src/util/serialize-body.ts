import {
  ISerializeBodyOptions
} from '../types';

import serializeParams from './serialize-params';

/**
 * 默认简单数组 `a: [1, 2]` 会变成 `a[]=1&a[]=2`，而一般我们需要 `a=1&a=2`，所以默认使用 `arrayFormat: 'repeat'`
 * 但有的时候，复杂对象数组 `arr: [{a: xx, b, c}, ...]` 默认转成 arr[0][a]=xx 需要搞成 `arr[0].a=xx`，这个时候可以传 `{ allowDots: true }` 覆盖默认行为
 */
export default function serializeBody(body: Record<string, unknown>, options: ISerializeBodyOptions = {
  arrayFormat: 'repeat'
}): string {
  return serializeParams(body, options);
}
