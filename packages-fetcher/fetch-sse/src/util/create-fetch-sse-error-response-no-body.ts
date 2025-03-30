import {
  EFetchSseErrorName
} from '../enum';

import createFetchSseError from './create-fetch-sse-error';

export default function createFetchSseErrorResponseNoBody(): Error {
  return createFetchSseError(EFetchSseErrorName.RESPONSE_NO_BODY, 'Response body is null.');
}
