import _forEach from 'lodash/forEach';
import _isEmpty from 'lodash/isEmpty';
import JSON5 from 'json5';

import {
  encode
} from '@kcuf/base64';

export default function encodeParams<T extends object>(params: Required<T>, defaults: Required<T>): string {
  const o: Record<string, unknown> = {};
  
  _forEach(params, (v, k) => {
    if (params[k as keyof T] !== undefined && defaults[k as keyof T] !== params[k as keyof T]) {
      o[k] = v;
    }
  });
  
  return _isEmpty(o) ? '' : encode(JSON5.stringify(o)); // eslint-disable-line import/no-named-as-default-member
}
