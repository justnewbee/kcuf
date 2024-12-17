import {
  EXhrErrorName
} from '../enum';

import createError from './create-error';

export default function createErrorTimeout(url: string, timeout: number): Error {
  return createError(EXhrErrorName.TIMEOUT, `Xhr timeout, url = ${url}, timeout = ${timeout}ms`);
}
