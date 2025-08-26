import JSON5 from 'json5';

import {
  decode
} from '@kcuf/base64';

export default function decodeParams<T extends object>(str: string, defaults: Required<T>): Required<T> {
  try {
    return {
      ...defaults,
      ...JSON5.parse<T>(decode(str)) // eslint-disable-line import/no-named-as-default-member
    };
  } catch (_err) {
    return {
      ...defaults
    };
  }
}
