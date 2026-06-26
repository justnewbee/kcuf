import _isError from 'lodash/isError';

import {
  IErrorExtendedInfo,
  IFetcherConfig,
  IFetcherError
} from '../types';

interface IOptions extends IErrorExtendedInfo {
  originalError?: unknown;
  name?: string; // 不限定枚举
  message?: string;
}

function assureError(originalError: unknown): Error {
  if (!originalError) {
    return new Error();
  }
  
  if (_isError(originalError)) {
    return originalError;
  }
  
  if (typeof originalError === 'string') {
    return new Error(originalError);
  }
  
  return new Error(originalError.toString()); // eslint-disable-line @typescript-eslint/no-base-to-string
}

export default function createFetcherError(config: IFetcherConfig, options: IOptions = {}): IFetcherError {
  const error = assureError(options.originalError) as IFetcherError;
  
  error.config = config;
  
  if (options.name) {
    error.name = options.name;
  }
  
  if (options.message) {
    error.message = options.message;
  }
  
  if (options.title) {
    error.title = options.title;
  }
  
  if (options.code) {
    error.code = options.code;
  }
  
  if (options.responseData) {
    error.responseData = options.responseData;
  }
  
  return error;
}
