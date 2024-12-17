import {
  EXhrErrorName
} from '../enum';

import createError from './create-error';

export default function createErrorNetwork(url: string): Error {
  return createError(EXhrErrorName.NETWORK, `Xhr network failure, url = ${url}`);
}
