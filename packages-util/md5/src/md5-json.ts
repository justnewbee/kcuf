import jsonStringifyOrdered from '@kcuf/json-stringify-ordered';

import md5String from './md5-string';

export default function md5Json(o: unknown): string {
  return md5String(jsonStringifyOrdered(o));
}
