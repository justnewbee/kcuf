import {
  EFetchErrorName
} from '../enum';

import createError from './create-error';

export default function createErrorTimeout(url: string, timeout: number): Error {
  return createError(EFetchErrorName.TIMEOUT, `fetcher-fetch timeout, url = ${url}, timeout = ${timeout}ms`);
}
