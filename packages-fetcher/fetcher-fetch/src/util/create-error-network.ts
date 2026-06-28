import {
  EFetchErrorName
} from '../enum';

import createError from './create-error';

export default function createErrorNetwork(url: string, originalMessage: string): Error {
  return createError(EFetchErrorName.NETWORK, `fetcher-fetch network failure, url = ${url}, message = ${originalMessage}`);
}
