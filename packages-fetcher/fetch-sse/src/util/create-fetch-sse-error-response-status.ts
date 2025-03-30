import {
  EFetchSseErrorName
} from '../enum';
import {
  IFetchSseErrorResponseStatus
} from '../types';

import createFetchSseError from './create-fetch-sse-error';

export default function createFetchSseErrorResponseStatus(response: Response): IFetchSseErrorResponseStatus {
  const error = createFetchSseError(EFetchSseErrorName.RESPONSE_STATUS, `Response status is ${response.status}, which should be 200.`) as IFetchSseErrorResponseStatus;
  
  error.status = response.status;
  error.statusText = response.statusText;
  
  return error;
}
