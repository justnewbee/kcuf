import {
  EJsonpErrorName
} from '../enum';

import createError from './create-error';

export default function createErrorNetwork(url: string): Error {
  return createError(EJsonpErrorName.NETWORK, `Jsonp network failure, url = ${url}`);
}
