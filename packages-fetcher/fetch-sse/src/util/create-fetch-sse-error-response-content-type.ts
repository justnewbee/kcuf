import {
  EFetchSseErrorName
} from '../enum';

import createFetchSseError from './create-fetch-sse-error';

export default function createFetchSseErrorResponseContentType(contentType: string): Error {
  return createFetchSseError(EFetchSseErrorName.RESPONSE_CONTENT_TYPE, `Response Content-Type "${contentType}" not text/event-stream.`);
}
