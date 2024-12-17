import {
  EJsonpErrorName
} from '../enum';

import createError from './create-error';

export default function createErrorTimeout(url: string, timeout: number): Error {
  return createError(EJsonpErrorName.TIMEOUT, `Jsonp timeout, url = ${url}, timeout = ${timeout}ms`);
}
